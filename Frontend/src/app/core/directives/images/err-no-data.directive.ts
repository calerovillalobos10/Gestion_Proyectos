import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoData]'
})

/*  Esta directiva carga una imagen por defecto
    al detectar una imagen invalida en el header.*/

export class NoDataDirective {

  constructor(private elementRef:ElementRef) {}
  @HostListener('error')
  loadDefaultImage(){
    
    const element = this.elementRef.nativeElement;
    element.src = '../../../assets/images/no_data.jpg'

  }


}