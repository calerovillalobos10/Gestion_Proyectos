import { Router } from '@angular/router';
import { Usuario } from './../../models/Usuario';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginURL = "http://localhost:4000";

  @Output() userData:Usuario | undefined;
  @Output() logining: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient,
    private router:Router
    ){
      this.checkStored();
    }

  async checkStored() {
    const stored = JSON.parse(localStorage.getItem("LogedUser") || '{}' );
      
    // Verifica la existencia de un usuario almacenado.
    if(stored){
      await this.loginUser({correo: stored.correo, contrasenia: stored.contrasenia});
      
      // Si es valido me permite acceder.
      if(this.isLogged()){
        this.router.navigate(['/inicio'])
      }else{
        // Si es invalido se elimina.
        localStorage.removeItem("LogedUser")
      }
    }
  }
  
  // Verificar si un usuario esta logueado.
  isLogged() {
    return this.userData !== undefined;
  }

  // Loguear a un usuario.
  // Recibe el usuario del back y lo asigna.
  async loginUser(user: Usuario){
    if(this.userData){
      this.logoutUser();
    }
    try {
      const res = await this.http.post<any>(`${this._loginURL}/login`, user)
      .pipe(timeout(5000)).toPromise();

      if(!res['estado'])

      const tokenPayload = this.openToken(res.token)['dataLogin'];

     

      if(!tokenPayload['estado']){
        this.userData = undefined
      }else{
        this.userData = {correo: tokenPayload['correo'], nombre: tokenPayload['nombre'], dobleAuth: tokenPayload['dobleAuth'] }
      }

    } catch (e) {
      console.log(e)
      this.userData = undefined
    }
  }

  logoutUser(){
    localStorage.removeItem("LogedUser");
     // Destruir aca el token tambien.
    this.userData = undefined;
  }

  getUserData(): Usuario | undefined {
    return this.userData;
  }

  // Tiene que realizar la verificacion del secret para el determinado usuario en el back.
  // Retorna true si el autenticador es valido, false de lo contrario.
  async googleAuth(pin:string) {
    let status = false;

    try {
      const res = await this.http.post<boolean>(this._loginURL, {correo: this.userData?.correo, pin:pin})
      .pipe(timeout(500)).toPromise();
      status = res;
    } catch (e) {
      status = false;
    }

    // Simulacion, el pin sera 333
    return pin === '333';
    //return status;
  }

  openToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  

}