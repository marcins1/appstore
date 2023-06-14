import { Component, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { StorageService } from '../services/storage.service';

interface cartElement{
  appID: String,
  name: String,

}

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent {
  @Input() name: String;
  @Input() price: number;
  @Input() photos: String[];
  @Input() description: String;
  @Input() premium_discount: number;
  @Input() appID: string = "0";

  constructor(private cart: CartService,
              private storage: StorageService){
    this.name = "loading";
    this.price = 0;
    this.photos = [];
    this.description = "loading";
    this.premium_discount = 0;
  }

  addToChart(){
    console.log(this.appID, this.name)
    this.cart.addItem(this.appID);
  }

  removeFromCart(){
    this.cart.removeItem(this.appID);
  }
  isLoggedIn():boolean{
    return this.storage.isLoggedIn();
  }
}
