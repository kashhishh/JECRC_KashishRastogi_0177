import { Routes } from '@angular/router';
import { Product } from './product/product';
import { Cart } from './cart/cart';

export const routes: Routes = [
  { path: '', component: Product },
  { path: 'cart', component: Cart }
];