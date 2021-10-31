import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appErrLogo]'
})
export class ErrLogoDirective {

  constructor(private elementRef:ElementRef) {}
    @HostListener('error')
    loadDefaultImage(){
     
      const element = this.elementRef.nativeElement;
      element.src = '../../../assets/images/not_found_user.png'
  }
}