import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss', '../../../../main/main-login.component.scss']
})
export class PrincipalComponent implements OnInit {

  public form!: FormGroup;

  public desaparecer:boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.form = this.formBuilder.group({
        correo: ["", 
        [ 
          Validators.required, 
          Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"), 
          Validators.maxLength(50)
        ]],
        password: ["", [
          Validators.required,
          Validators.maxLength(20)
        ]],
        remember: []
      })

     
    }

  ngOnInit(): void {

    const mailToSet = localStorage.getItem("remember");

    if(mailToSet){
      this.form.patchValue({
        correo: mailToSet,
        remember: true
      });
      this.form.value.correo = mailToSet;
    }else{
      this.form.value.remember = false;
    }
  }

  // Remueve correo de local si no se desea recordar.
  removeRemember(){
    if(!this.form.value.remember){
      localStorage.removeItem("remember");
    }
  }

  // Metodo de preparacion para login.
  async prepareLogin(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      await this.authService.loginUser({correo: this.form.value.correo, contrasenia: this.form.value.password});
      if(this.authService.isLogged()){
        localStorage.setItem('LogedUser',JSON.stringify(this.authService.getUserData()))
        this.makeLogin();
      }else{
        this.simpleAlert("Correo o contraseña inválidos");
      }
    }
  }

  // Metodo posterior a un login valido.
  makeLogin(){
    if(this.form.value.remember){
      localStorage.setItem("remember", `${this.form.value.correo}`);
    }

    this.desaparecer = true;
    setTimeout(()=>{
      this.authService.logining.emit(true);
      setTimeout(() => {
        this.router.navigate(['/'])
      },500)
    },450)
  }

  simpleAlert(message: string) {
    Swal.fire({
      toast:true,
      title: "Atención",
      text: message,
      timer: 1500,
      icon: 'warning',
      position: 'top-right',
      timerProgressBar:true,
      showConfirmButton: false
    });
  }

  toRecovery(){
    this.desaparecer = true;
   
    setTimeout(()=>{
      this.router.navigate(["/login/recuperar"]);
    },500)
  }

}