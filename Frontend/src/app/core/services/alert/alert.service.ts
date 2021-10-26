import { AuthService } from '@core/services/auth/auth.service';
import { Injectable } from '@angular/core';

import  Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private authService: AuthService){}

  /*
    Metodo de alerta básico
  */  
  simpleAlert(message: string) {
    Swal.fire({
      toast:true,
      title: "Atención",
      text: message,
      timer: 1500,
      icon: 'warning',

      timerProgressBar:true,
      showConfirmButton: false
    });
  }

  /*
    Metodo de alerta que retorna una promesa
  */ 
  promiseAlert(message: string){
    return  Swal.fire({
      toast:true,
      title: message,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  }

  googleAuthAlert(){
    return Swal.fire({
      title: 'Authenticador de Google',
      text: 'Ingrese el código proporcionado en su autenticador.',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Autenticar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        let response = await this.authService.googleAuth(login);
        if (!response) {
          Swal.showValidationMessage(
            `Código no válido.`
          )
        }
        return response;
      },
      allowOutsideClick: false
    })
  }

}