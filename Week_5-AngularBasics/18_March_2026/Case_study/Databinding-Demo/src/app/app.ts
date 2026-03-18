import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //Data
  productName = 'Laptop';
  price = 50000;
  quantity = 1;
  isAvailable = true;
  //disable = false;
  imageUrl = 'https://picsum.photos/150';

  //Two way Binding
  customerName = '';
  address = '';

  //Method(Event Binding)
  increaseQty(){
    this.quantity++;
  }
  decreaseQty(){
    this.quantity--;
  }
  toggleAvailability(){
    this.isAvailable = !this.isAvailable;
  }
  getTotal(){
    return this.price*this.quantity;
  }

}
