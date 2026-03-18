import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusColor]'
})
export class StatusColorDirective implements OnInit {

  @Input() appStatusColor!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appStatusColor >= 50) {
      this.el.nativeElement.style.backgroundColor = '#e6ffed';
      this.el.nativeElement.style.borderLeft = '6px solid green';
    } else {
      this.el.nativeElement.style.backgroundColor = '#ffe6e6';
      this.el.nativeElement.style.borderLeft = '6px solid red';
    }
  }
}