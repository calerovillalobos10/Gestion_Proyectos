import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appErrImg]'
})

/*  Esta directiva carga una imagen por defecto
    al detectar una imagen invalida en el header.*/

export class ErrImgDirective {

  constructor(private elementRef:ElementRef) {}
  @HostListener('error')
  loadDefaultImage(){
    
    const element = this.elementRef.nativeElement;
    element.src = '../../../assets/images/img_not_found.jpg'

  }


}