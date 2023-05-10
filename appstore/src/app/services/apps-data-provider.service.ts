import { Injectable } from '@angular/core';
import appData  from  '../data/mockAppsData.json'
import { App } from '../data/IApp';
import cart from '../data/mockCart.json'

@Injectable({
  providedIn: 'root'
})
export class AppsDataProviderService {

  data: App[];
  cart: any[];

  constructor() {
    this.data = appData;
    this.cart = cart;
  };

  getAppById(id: number){
    return this.data[id-1];
  };
  getAllApps(){
    return this.data;
  }

  getCartAppsIDs(){
    return this.cart;
  }


}
