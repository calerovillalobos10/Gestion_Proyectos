import { Injectable } from '@angular/core';

import  Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

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

  promiseAlert(message: string){
    return  Swal.fire({
      toast:true,
      title: 'Codigo correcto',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  }

}
