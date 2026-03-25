import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  products = [
    { id: 1, name: 'Laptop', price: 999, emoji: '💻', description: 'High performance laptop' },
    { id: 2, name: 'Smartphone', price: 499, emoji: '📱', description: 'Latest model smartphone' },
    { id: 3, name: 'Headphones', price: 199, emoji: '🎧', description: 'Noise cancelling headphones' },
    { id: 4, name: 'Tablet', price: 349, emoji: '📟', description: '10 inch display tablet' },
    { id: 5, name: 'Smartwatch', price: 249, emoji: '⌚', description: 'Fitness tracking smartwatch' },
    { id: 6, name: 'Camera', price: 799, emoji: '📷', description: 'DSLR digital camera' }
  ];

  addedIds: Set<number> = new Set();

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addItem(product);
    this.addedIds.add(product.id);
    setTimeout(() => this.addedIds.delete(product.id), 1500);
  }

  getCartCount(): number {
    return this.cartService.getTotalCount();
  }

  isInCart(id: number): boolean {
    return this.cartService.getItems().some(i => i.id === id);
  }

  getItemQuantity(id: number): number {
    const item = this.cartService.getItems().find(i => i.id === id);
    return item ? item.quantity : 0;
  }
}