import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <h1>Welcome to the Product Store</h1>
    <h2>Explore our wide range of products and find the best deals!</h2>
  `,
  styleUrls: ['./home.css']
})
export class Home {}