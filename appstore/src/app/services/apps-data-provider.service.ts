import { Injectable } from '@angular/core';
import appData  from  '../data/mockAppsData.json'


interface App{
  id: Number,
  name: String,
  price: Number,
  photos: String[],
  premiumDiscount: Number,
  description: String
}

@Injectable({
  providedIn: 'root'
})
export class AppsDataProviderService {

  data: App[];

  constructor() {
    this.data = appData;
   };

  getAppById(id: number){
    return this.data[id];
  };
  getAllApps(){
    return this.data;
  }


}
