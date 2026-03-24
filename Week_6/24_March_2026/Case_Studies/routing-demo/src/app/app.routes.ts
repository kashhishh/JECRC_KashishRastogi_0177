import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductComponent } from './product/product';
import { Error } from './error/error';
import {Contact} from './contact/contact';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'products', component: ProductComponent},
    {path: 'product/:id', loadComponent: () => import('./product-detail/product-detail').then(m => m.ProductDetail)},
    {path: 'contact', component: Contact},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: Error},
  
];
