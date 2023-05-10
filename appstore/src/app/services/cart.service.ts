import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AppsDataProviderService } from './apps-data-provider.service';
import { App } from '../data/IApp';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  currentUserID: Number;
  cartApps: Map<number, App> = new Map<number, App>;


  constructor(private auth: AuthService,
    private data: AppsDataProviderService) {
      this.currentUserID = this.auth.getCurrentUser().id;
      let cartApssIds: Array<any> = this.data.getCartAppsIDs();
      cartApssIds.forEach(element => {
        this.cartApps.set(element, this.data.getAppById(element));
      });
    }

  addItem(itemID: number){
    this.cartApps.set(itemID, this.data.getAppById(itemID));
    console.log("mock add " + itemID);
  }

  removeItem(itemID: number){
    this.cartApps.delete(itemID);
    console.log("mock remove " + itemID);
  }

  getCart(): App[]{
    let apps: App[] = [];
    for(let [key, value] of this.cartApps){
      apps.push(value);
    }
    return apps;
  }
}
