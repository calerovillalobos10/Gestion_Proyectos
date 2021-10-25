import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  private _loginURL = "http://localhost:4000/api/validarCorreo";

  @Output() userMail:string | undefined;
  @Output() temporal:string | undefined;

  constructor(
    private http:HttpClient,
  ) { }  
  
  isRecovering() {
   return this.userMail !== undefined;
  }

  async validateMail(userMail: string){
    let status = false;
    
    try {
      const res = await this.http.post<any>(this._loginURL, {coreo:userMail})
      .pipe(timeout(500)).toPromise();
      status = res;
    } catch (e) {
      /* Simula consulta a la API.*/
      status = this.simulate(userMail);
      //status = false
    }
    return status;
  }

  async changePass(pass:string){
    let status = false;
    
    try {
      const res = await this.http.post<any>(this._loginURL, {coreo:this.userMail, contrasenia: pass})
      .pipe(timeout(500)).toPromise();
      status = res;
    } catch (e) {
    
      status = false;
      
    }

    //return status;
    return true;
  }

  async sendCode(){
    let status = false;
    
    try {
      const res = await this.http.post<any>(this._loginURL, {coreo:this.userMail, codigo:this.temporal})
      .pipe(timeout(500)).toPromise();
      status = res;
    } catch (e) {
      status = false;
    }
    
    //return status;
    console.log(this.temporal) // Quitar esto.
    return true;

  }

  generateTemporal(){
    this.temporal = this.generateTemporalPass();
  }

  generateTemporalPass() {
    const length = 8;
    const characters = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return pass;
  }
  
  
  
  
  
  
  /* Simula consulta a la API.*/
    simulate(correo: string){
      let status = false;
      const users = [
        {nombre: 'Luis', correo: 'Luis@gmail.com', contrasenia: '123'},
        {nombre: 'Andromeda', correo: 'as@gmail.com', contrasenia: '123'},
        {nombre: 'Felix', correo: 'ad@gmail.com', contrasenia: '123'}
      ]
  
      users.forEach(element => {
        if(element.correo === correo ){
          status = true;
        }
      });
  
      return status;
    }
    /*--------------------------*/ 


}
