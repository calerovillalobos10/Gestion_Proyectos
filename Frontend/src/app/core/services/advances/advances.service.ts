import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

import { API_URL } from '@core/others/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  // Emite la comunicacion entre componente modal y de lista para mostrar el modal
  @Output() modalNeeded: EventEmitter<any> = new EventEmitter();

  // Emite la comunicacion entre el modal y la lista para indicar que se registro el funcionario
  @Output() updateNeeded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient
  ) { }

  // Metodo de obtencion por id. 
  getById(id: any){
    
    return this.http.post<any>(`${API_URL}/avanceById`, {id: id})
  }

  // Metodo de creacion de avance.  
  create(adv: FormData) {
    return this.http.post<any>(`${API_URL}/avances`, adv)
  }

  // Metodo de actualizacion de avance. 
  update(adv: FormData) {
    return  this.http.put<any>(`${API_URL}/avances`, adv)
  }

  // Elimina un avance por id     
  deleteById(id: number) {
    return this.http.post<any>(`${API_URL}/deleteAvance`, {id: id})
  }

  //Obtiene todas los avances     
  getAll(){
    return this.http.get<any>(`${API_URL}/avances`)
  }

  // Obtiene todos los avances de una determinada solicitud
  getBySolicitude(solicitudId: number) {
    return this.http.post<any>(`${API_URL}/avancesbysolicitud`, {solicitudId:solicitudId})
  }
}