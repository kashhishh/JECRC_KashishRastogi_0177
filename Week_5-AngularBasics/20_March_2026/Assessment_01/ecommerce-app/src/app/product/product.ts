import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html'
})
export class ProductComponent {

  constructor(private cart: CartService) {}

  search = '';
  selectedCategory = '';

  products = [
    { id: 1, name: 'Laptop', price: 50000, category: 'Electronics', rating: 4 },
    { id: 2, name: 'Phone', price: 20000, category: 'Electronics', rating: 5 },
    { id: 3, name: 'Shoes', price: 3000, category: 'Fashion', rating: 3 }
  ];

  add(product: any) {
    this.cart.addToCart(product);
  }

  filteredProducts() {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.search.toLowerCase()) &&
      (this.selectedCategory ? p.category === this.selectedCategory : true)
    );
  }
}