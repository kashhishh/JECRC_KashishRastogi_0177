import { Component } from '@angular/core';
import { RoleDirective } from './role'; // 👈 IMPORT

@Component({
  selector: 'app-root',
  standalone: true,              
  imports: [RoleDirective],      
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  role: string = 'admin';

  toggleRole() {
    this.role = this.role === 'admin' ? 'user' : 'admin';
  }
}