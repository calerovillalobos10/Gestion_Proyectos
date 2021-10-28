import { AlertService } from './../../../../../../core/services/alert/alert.service';

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoveryService } from '@core/services/recovery/recovery.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss', '../../../../main/main-login.component.scss'
  ]
})
export class Paso1Component implements OnInit {

  public form!:FormGroup;
  public desaparecer:boolean | undefined;

  // Controla la pantalla de loading
  public sendingMail = false;

  constructor(
    private router: Router, 
    private alert: AlertService, 
    private recoveryService: RecoveryService,
    private formBuilder:FormBuilder
  ){
    this.form = this.formBuilder.group({
      correo: ["", 
      [ Validators.required, 
        Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"), 
        Validators.maxLength(50)]]
    })
   }

   ngOnInit(): void {
  }
  
    // Validación de correo para envio de codigo.
    async prepararRecuperacion() {
      this.form.markAllAsTouched();
      
      if (this.form.valid) {
       if(await this.recoveryService.validateMail(this.form.value.correo)){
        this.recoveryService.userMail = this.form.value.correo;
        this.sendingMail = true;
        this.enviarCodigo();
       }else{
        this.alert.simpleAlert("El correo ingresado no es válido");
       }
      }
    }

  // Envio de código a un correo valido.
  async enviarCodigo() {

    //  Se genera el temporal.
    this.recoveryService.generateTemporal();

    // Se envia por correo.
    if(await this.recoveryService.sendCode()){
      this.router.navigate(['/login/recuperar/paso2'])
    }else{
      this.alert.simpleAlert("Surgió un error al enviar el correo");
    }
    this.sendingMail = false;
  }

  async aLogin() {
    this.desaparecer = true;
   
    setTimeout(()=>{
      this.router.navigate(["login"]);
    },500)
  }


}