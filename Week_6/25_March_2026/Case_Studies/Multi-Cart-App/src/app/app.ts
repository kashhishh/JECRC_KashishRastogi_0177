import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public cartService: CartService) {}

  getCartCount(): number {
    return this.cartService.getItems().length;
  }
}