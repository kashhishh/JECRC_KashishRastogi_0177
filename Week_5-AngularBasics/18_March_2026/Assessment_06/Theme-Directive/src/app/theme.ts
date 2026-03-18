import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnChanges {

  @Input() appTheme: string = 'light';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appTheme === 'dark') {
      this.el.nativeElement.style.backgroundColor = '#1e1e1e';
      this.el.nativeElement.style.color = '#ffffff';
    } else {
      this.el.nativeElement.style.backgroundColor = '#ffffff';
      this.el.nativeElement.style.color = '#000000';
    }
  }
}