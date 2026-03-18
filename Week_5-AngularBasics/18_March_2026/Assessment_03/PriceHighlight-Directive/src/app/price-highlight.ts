import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPriceHighlight]'
})
export class PriceHighlightDirective implements OnInit {

  @Input() appPriceHighlight!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appPriceHighlight > 50000) {
      this.el.nativeElement.style.backgroundColor = '#ffe5e5';
      this.el.nativeElement.style.borderLeft = '6px solid red';
    } else {
      this.el.nativeElement.style.backgroundColor = '#e5ffe5';
      this.el.nativeElement.style.borderLeft = '6px solid green';
    }
  }
}