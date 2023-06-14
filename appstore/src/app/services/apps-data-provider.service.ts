import { Injectable } from '@angular/core';
import appData  from  '../data/mockAppsData.json'
import { App } from '../data/IApp';
import cart from '../data/mockCart.json'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

const APS_API = 'http://localhost:8080/applications/';
const USER_API = 'http://localhost:8080/authorization/cart';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppsDataProviderService {

  data: App[] = appData;
  cart: any[] = cart;
  httpOptions: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,
              private auth: AuthService) {
    this.getAllApps().subscribe({
      next: data =>{
        this.data = data as App[];
      },
      error: err => {
        alert(err);
      }
    })
  };

  getAppById(id: string): App | null{
    for ( let app of this.data)
      if(app._id == id) return app;
    return null;
  };

  getAllApps(){
    return this.http.get(APS_API, httpOptions);
  }

  getCartAppsIDs(){
    const id = this.auth.getCurrentUser()!.userID;
    const httpCartOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().set('id', id)
    };
    // let params = new HttpParams().set('userID', this.auth.getCurrentUser().id);
    this.http.get(USER_API, httpCartOptions).subscribe({
      next: data => {
        this.cart = data as String[];
      },
      error: err => {
        alert(err);
      }
    })
    return this.cart;
  }

  addNewApp(newApp:App) {
    return this.http.post(APS_API, newApp, httpOptions);
  }

}
