import { API_URL } from '@core/others/Enviroment';
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

  @Output() userData:Usuario | undefined;
  @Output() logining: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient,
    private router:Router
    ){
      this.checkStored();
    }

  async checkStored() {
    const stored = localStorage.getItem("id_token") || '{}';
   
    // Verifica la existencia de un token almacenado.
    if(stored){

      if(await this.validateToken()){

        
        const tokenPayload = this.openToken(stored)['dataBD'];
        this.loadDataToken(tokenPayload);
      
      // Si es valido me permite acceder.
        const route = (document.referrer).split('/');
        let destination = route[route.length-1];
             
    
        if(destination.toLowerCase() == 'login' || destination == ''){
          destination = 'inicio';
        }
   

          this.router.navigate([`/${destination}`])
     
      }else{
        // Si es invalido se elimina.
        localStorage.removeItem("id_token")
      }
    }
  }

  /*
    Envia una peticion al servidor solo para validar si el token al realizar el refrescamiento aun no ha expirado.
  */
  async validateToken(){
    let status = false;
    try {
      const res = await this.http.post<any>(`${API_URL}/autenticar`, {correo: 1, pin:1})
      .pipe(timeout(5000)).toPromise();
      status = true;
    } catch (e) {
      status = false;
    }
    return status
  }
  
  /*
    Verificar si un usuario esta logueado.
  */ 
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
      const res = await this.http.post<any>(`${API_URL}/login`, user)
      .pipe(timeout(5000)).toPromise();

      if(res['mensaje']){
        this.userData = undefined
      }else{
        const tokenPayload = this.openToken(res["token"])['dataBD'];
        this.loadDataToken(tokenPayload);
        localStorage.setItem("id_token", res["token"])
      }

    } catch (e) {
      this.userData = undefined
    }
  }

  // Carga los datos en memoria apartir del token seleccionado
  loadDataToken(tokenPayload:any){
    this.userData = {
      correo: tokenPayload['correo'], 
      nombre: tokenPayload['nombre'], 
      dobleAuth: tokenPayload['dobleAuth'], 
      urlFoto: tokenPayload['urlFoto'] 
    }
  }

  logoutUser(){
    localStorage.removeItem("id_token");
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
      const res = await this.http.post<any>(`${API_URL}/autenticar`, {correo: this.userData?.correo, pin:pin})
      .pipe(timeout(5000)).toPromise();
      status = res['estado'];

    } catch (e) {
      status = false;
    }
    return status;
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