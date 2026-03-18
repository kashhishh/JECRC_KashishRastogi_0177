import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ThemeDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  theme: string = 'light';

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}