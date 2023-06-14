import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() name: String;
  @Input() appID: string;
  @Input() price: number;

  constructor(private cart: CartService){
    this.name = "loading";
    this.appID = "0";
    this.price = 0;
  }
  removeFromCart(){
    this.cart.removeItem(this.appID);
  }

}
