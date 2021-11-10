import { Avance } from './../../models/Avance';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  private _loginURL = "http://localhost:4000";

  // Emite la comunicacion entre componente modal y de lista para mostrar el modal
  @Output() modalNeeded: EventEmitter<any> = new EventEmitter();

  // Emite la comunicacion entre el modal y la lista para indicar que se registro el funcionario
  @Output() updateNeeded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient
  ) { }

  // Metodo de obtencion por id. 
  getById(id: any){
    return this.http.post<any>(`${this._loginURL}/avanceById`, {id: id})
  }

  // Metodo de creacion de avance.  
  create(adv: FormData) {
    return this.http.post<any>(`${this._loginURL}/avances`, adv)
  }

  // Metodo de actualizacion de avance. 
  update(adv: FormData) {
    return  this.http.put<any>(`${this._loginURL}/avances`, adv)
  }

  // Elimina un avance por id     
  deleteById(id: number) {
    return this.http.post<any>(`${this._loginURL}/deleteAvance`, {id: id})
  }

  //Obtiene todas los avances     
  getAll(){
    return this.http.get<any>(`${this._loginURL}/avances`)
  }

  // Obtiene todos los avances de una determinada solicitud
  getBySolicitude(solicitudId: number) {
    return this.http.post<any>(`${this._loginURL}/avancesbysolicitud`, {solicitudId:solicitudId})
  }
}