import { Router } from '@angular/router';
import { Usuario } from './../../models/Usuario';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL = "http://localhost:4000/api/register";
  private _loginURL = "http://localhost:4000/api/register";

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
      
    // Verifica la existencia de un token.
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
  async loginUser(user: Usuario){
    try {
      const res = await this.http.post<Usuario>(this._loginURL, user)
      .pipe(timeout(500)).toPromise();
      this.userData = res;
    } catch (e) {
      /* Simula consulta a la API.*/
      this.simulate(user);
      //this.userData = undefined
    }
  }

  logoutUser(){
    localStorage.removeItem("LogedUser")
    this.userData = undefined;
  }

  getUserData(): Usuario | undefined {
    return this.userData;
  }

  
  /* Simula consulta a la API.*/
  simulate(user: Usuario){
    const users = [
      {nombre: 'Luis', correo: 'Luis@gmail.com', contrasenia: '123'},
      {nombre: 'Andromeda', correo: 'as@gmail.com', contrasenia: '123'},
      {nombre: 'Felix', correo: 'ad@gmail.com', contrasenia: '123'}
    ]

    users.forEach(element => {
      if(element.correo === user.correo && element.contrasenia === user.contrasenia){
        this.userData = element;
      }
    });

    return this.userData;
  }
  /*--------------------------*/ 

}