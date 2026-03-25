import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink], 
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  constructor(public cartService: CartService) {}

  getItems(): CartItem[] {
    return this.cartService.getItems();
  }

  increase(id: number) {
    const item = this.getItems().find(i => i.id === id);
    if (item) this.cartService.addItem(item);
  }

  decrease(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
}