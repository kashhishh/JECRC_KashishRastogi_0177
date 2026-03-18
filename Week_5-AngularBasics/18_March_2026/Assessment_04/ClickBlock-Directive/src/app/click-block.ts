import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickBlock]'
})
export class ClickBlockDirective {

  @Input() appClickBlock: boolean = true;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.appClickBlock) {
      event.preventDefault();
      event.stopImmediatePropagation(); 
    }
  }
}