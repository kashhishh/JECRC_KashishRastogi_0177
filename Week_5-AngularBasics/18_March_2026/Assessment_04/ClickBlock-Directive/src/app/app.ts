import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickBlockDirective } from './click-block';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClickBlockDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  isAllowed: boolean = true;

  toggleAccess() {
    this.isAllowed = !this.isAllowed;
  }

  handleClick(item: string) {
    if (!this.isAllowed) return; 

    alert(`✅ You clicked ${item}`);
  }
}