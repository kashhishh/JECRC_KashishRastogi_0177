import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';  // ✅ ADD THIS

import { ProductComponent } from './product/product';
import { CartComponent } from './cart/cart';
import { CheckoutComponent } from './checkout/checkout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    CartComponent,
    CheckoutComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('ecommerce-app');
}