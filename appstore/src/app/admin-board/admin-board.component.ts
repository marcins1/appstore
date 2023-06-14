import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { App } from '../data/IApp';
import { AppsDataProviderService } from '../services/apps-data-provider.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  content?: string;
  photo: string = "";
  newApp: App = {
    _id: "0",
    name: '',
    price: 0,
    downloadSize: 0,
    description: '',
    photos: [],
  };

  constructor(private dataService: DataService,
              private db: AppsDataProviderService) { }

  ngOnInit(): void {
    this.dataService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  onSubmit(){
    this.newApp.photos.push(this.photo);
    console.log("[admin board] adding new app   " + this.newApp.photos);
    this.db.addNewApp(this.newApp).subscribe({
      next: data => {
        alert(data);
      },
      error: err => {
        alert(err);
      }
    });
  }
}
