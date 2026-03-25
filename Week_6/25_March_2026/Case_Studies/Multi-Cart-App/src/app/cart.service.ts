import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  addItem(product: { id: number; name: string; price: number }) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }

  decreaseQuantity(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeItem(id);
      }
    }
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getTotalCount(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  clearCart() {
    this.items = [];
  }
}