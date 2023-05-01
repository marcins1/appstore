import { Component } from '@angular/core';
import { AppsDataProviderService } from '../services/apps-data-provider.service';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css']
})
export class AppContainerComponent {

  Apps: any[];

  constructor(DataService: AppsDataProviderService){
    this.Apps = DataService.getAllApps();
  }
}
