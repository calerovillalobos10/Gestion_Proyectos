import { Router } from '@angular/router';
import { RecoveryService } from './../../../../../../core/services/recovery/recovery.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert/alert.service';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.scss', '../../../../main/main-login.component.scss']
})
export class Paso2Component implements OnInit {
  ngOnInit(): void { }

  public form!: FormGroup;

  // Aplica una clase al contenedor.
  public desaparecer: boolean = false;

  constructor(
    private alert: AlertService,
    private router: Router,
    private loginService: RecoveryService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      codigo: ["", Validators.required],
    })
  }

  // Validación de codigo enviado.
  prepararCodigo() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.form.value.codigo !== this.loginService.temporal) {
        this.alert.simpleAlert("El código no coincide");
      } else {
        this.alert.promiseAlert('Código correcto')
          .then(() => {
            this.router.navigate(['/login/recuperar/paso3'])
          });
      }
    }
  }

  async aLogin() {
    this.desaparecer = true;

    setTimeout(() => {
      this.router.navigate(["login"]);
    }, 500)
  }
}
