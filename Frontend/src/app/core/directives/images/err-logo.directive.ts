import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appErrLogo]'
})
export class ErrLogoDirective {

  /*  Esta directiva carga una imagen por defecto al detectar
     una imagen invalida en el modulo de usuarios.*/

  constructor(private elementRef: ElementRef) { }
  @HostListener('error')
  loadDefaultImage() {
    const element = this.elementRef.nativeElement;
    element.src = '../../../assets/images/not_found_user.png'
  }
}