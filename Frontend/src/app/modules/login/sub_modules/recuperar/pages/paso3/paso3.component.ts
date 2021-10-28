import { AlertService } from '@core/services/alert/alert.service';
import { RecoveryService } from '@core/services/recovery/recovery.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.scss', '../../../../main/main-login.component.scss']
})
export class Paso3Component implements OnInit{

  ngOnInit(): void { }

  public form!: FormGroup;

  // Aplica una clase al contenedor.
  public desaparecer: boolean = false;

  constructor(
    private alert: AlertService,
    private router: Router,
    private recoveryService: RecoveryService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      correo: [{ value: this.recoveryService.userMail, disabled: true }, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ["", Validators.required, Validators.minLength(8)],
      rePassword: ["", Validators.required],
    })
  }

  prepararCambio() {
    this.form.markAllAsTouched();

    if (this.form.valid && this.form.value.password === this.form.value.rePassword) {
      this.cambiarContrasenia();
    }
  }

  async cambiarContrasenia() {
    if (await this.recoveryService.changePass(this.form.value.rePassword)) {
      this.recoveryService.userMail = '';
      this.alert.promiseAlert('Cambio correcto')
        .then(() => {
          this.router.navigate(["login"]);
        });
    } else {
      this.alert.simpleAlert("Surgió un error, inténtelo nuevamente.")
    }
  }

  async aLogin() {
    this.desaparecer = true;

    setTimeout(() => {
      this.router.navigate(["login"]);
    }, 500)
  }
}