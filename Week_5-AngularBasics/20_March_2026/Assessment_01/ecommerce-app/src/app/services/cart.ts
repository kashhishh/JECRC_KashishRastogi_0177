import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {

  cartItems = signal<any[]>([]);

  addToCart(product: any) {
    const items = this.cartItems();
    const existing = items.find(p => p.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    this.cartItems.set([...items]);
  }

  removeItem(id: number) {
    this.cartItems.set(this.cartItems().filter(p => p.id !== id));
  }

  clearCart() {
    this.cartItems.set([]);
  }

  updateQty(id: number, qty: number) {
    const items = this.cartItems();
    const item = items.find(p => p.id === id);
    if (item) item.quantity = qty;
    this.cartItems.set([...items]);
  }

  getTotal() {
    return this.cartItems().reduce((sum, p) => sum + p.price * p.quantity, 0);
  }
}