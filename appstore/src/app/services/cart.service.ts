import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AppsDataProviderService } from './apps-data-provider.service';
import { App } from '../data/IApp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const USER_API = 'http://localhost:8080/authorization/cart';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface CartUpdate{
  userID: string,
  appID: string
}

interface Buy{
  userID: string
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  currentUserID: string = "";
  cartApps: Map<string, App> = new Map<string, App>;


  constructor(private auth: AuthService,
    private data: AppsDataProviderService,
    private http: HttpClient) {
    }

  ngOnInit(){
    this.currentUserID = this.auth.getCurrentUser().userID;
    let cartAppIds = this.data.getCartAppsIDs();
    cartAppIds.forEach(appID=> {
      let newApp = this.data.getAppById(appID);
    if(newApp) this.cartApps.set(appID, newApp);
    });
  }

  addItem(itemID: string){
    const data: CartUpdate = {
      userID: this.currentUserID,
      appID: itemID
    }
    this.http.post(USER_API + "/add", data, httpOptions).subscribe({
      next: data => {
        console.log("Added item to cart, respone:\n" + data);
      },
      error: err => {
        alert(err);
      }
    })
    let newApp = this.data.getAppById(itemID);
      if(newApp) this.cartApps.set(itemID, newApp);
  }

  removeItem(itemID: string){
    const data: CartUpdate = {
      userID: this.currentUserID,
      appID: itemID
    }
    this.http.post(USER_API + "/remove", data, httpOptions).subscribe({
      next: data => {
        console.log("Removed item from cart, respone:\n" + data);
      },
      error: err => {
        alert(err);
      }
    })

    this.cartApps.delete(itemID);
  }

  getCart(): App[]{
    this.currentUserID = this.auth.getCurrentUser().userID;
    let cartAppIds = this.data.getCartAppsIDs();
    console.log(cartAppIds);
    cartAppIds.forEach(appID=> {
      let newApp = this.data.getAppById(appID);
      if(newApp) this.cartApps.set(appID, newApp);
    });
    let apps: App[] = [];
    this.cartApps.forEach((appData, appID) => {
      apps.push(appData);
    });
    return apps ;
  }

  buyItems():void{
    let buy: Buy = { userID: this.currentUserID}
    this.http.post(USER_API + "/buy", buy, httpOptions).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err)
    }
    )
  }
}
