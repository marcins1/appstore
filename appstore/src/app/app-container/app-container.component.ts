import { Component } from '@angular/core';
import { AppsDataProviderService } from '../services/apps-data-provider.service';
import  mockAppsData  from '../data/mockAppsData.json'

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css']
})
export class AppContainerComponent {

  Apps: any[];

  constructor(DataService: AppsDataProviderService){
    this.Apps = mockAppsData;
    DataService.getAllApps().subscribe({
      next: data => {
        this.Apps = data as any[];
        console.log(this.Apps)
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
