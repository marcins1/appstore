import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AppsDataProviderService } from './apps-data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  currentUserID: Number;

  constructor(private auth: AuthService,
    private data: AppsDataProviderService) {
      this.currentUserID = this.auth.getCurrentUser().id;
    }

  addItem(itemID: Number){
    console.log("mock add " + itemID);
  }

  removeItem(itemID: Number){
    console.log("mock remove " + itemID);
  }
}
