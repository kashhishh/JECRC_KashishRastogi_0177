import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  students = [
    { name: 'Aman', marks: 92 },
    { name: 'Riya', marks: 76 },
    { name: 'John', marks: 45 },
    { name: 'Sara', marks: 33 },
    { name: 'Karan', marks: 88 }
  ];

}