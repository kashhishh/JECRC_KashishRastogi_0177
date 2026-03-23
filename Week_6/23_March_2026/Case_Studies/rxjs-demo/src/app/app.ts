import { Component, signal } from '@angular/core';

import { RxjsDemoComponent } from './rxjs-demo/rxjs-demo';

@Component({
  selector: 'app-root',
  imports: [ RxjsDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'

})
export class App {
  protected readonly title = signal('rxjs-demo');
}

