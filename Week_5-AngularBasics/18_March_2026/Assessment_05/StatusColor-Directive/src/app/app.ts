import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status-color';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  students = [
    { name: 'Aman', marks: 75 },
    { name: 'Riya', marks: 45 },
    { name: 'Karan', marks: 60 },
    { name: 'Sneha', marks: 30 }
  ];
}