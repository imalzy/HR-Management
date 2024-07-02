import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective implements OnInit{
  @Input()
  disabledNumberOnly: boolean = false;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
      if (!this.disabledNumberOnly) {
          this.renderer.setAttribute(
              this.elRef.nativeElement,
              'onkeypress',
              'return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0'
          );
      }
  }

}
