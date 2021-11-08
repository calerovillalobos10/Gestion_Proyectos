import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

import { Solicitud } from '@core/models/Solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudeService {

  private _loginURL = "http://localhost:4000";

  // Emite la comunicacion entre componente modal y de lista para mostrar el modal
  @Output() modalNeeded: EventEmitter<any> = new EventEmitter();

  // Emite la comunicacion entre el modal y la lista para indicar que se registro el funcionario
  @Output() updateNeeded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient
  ) { }

  // Metodo de obtencion por id.  METHOD: Get/:id
  getById(id: number){
    return this.http.post<any>(`${this._loginURL}/solicitudById`, {id: id})
  }

  // Metodo de creacion de solicitud.  METHOD: Post
  create(sol: FormData) {
    return this.http.post<any>(`${this._loginURL}/solicitudes`, sol)
  }

  // Metodo de actualizacion de solicitud.  METHOD: Put
  update(dept: FormData) {
    return  this.http.put<any>(`${this._loginURL}/solicitudes`, dept)
  }

  // Elimina una solicitud por id     METHOD: Delete
  deleteById(id: number) {
    return this.http.post<any>(`${this._loginURL}/deleteSolicitud`, {id: id})
  }

  //Obtiene todas las solicitudes     METHOD: Get
  getAll(){
    return this.http.get<any>(`${this._loginURL}/solicitudes`)
  }
}