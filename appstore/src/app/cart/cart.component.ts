import { Component, OnInit } from '@angular/core';
import { App } from '../data/IApp';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  apps: App[] = [];

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.apps = this.cart.getCart();
  }

  calculatePrice(): number{
    let sum = 0;
    this.apps.forEach(element => {
      if(element) sum += element.price;
    })
    return sum;
  }

  buyApps(){
    console.log("buying list of apps " + this.apps);
  }
}
