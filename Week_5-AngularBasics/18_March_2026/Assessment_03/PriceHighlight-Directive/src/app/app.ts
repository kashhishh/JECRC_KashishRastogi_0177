import { Component } from '@angular/core';
import { PriceHighlightDirective } from './price-highlight';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,PriceHighlightDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  products = [
    { name: 'Laptop', price: 75000 },
    { name: 'Mobile', price: 30000 },
    { name: 'TV', price: 60000 },
    { name: 'Headphones', price: 2000 }
  ];

}