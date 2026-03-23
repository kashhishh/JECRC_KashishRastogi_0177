import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  addToCart(product: Product) {
    const Item = this.cartItems.find(item => item.productId === product.productId);
    if (Item) {
      Item.quantity += 1;
    } else {
      this.cartItems.push({... product, quantity: 1 });
    }
  }
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }
  
  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity,0);
  }
}
