import { Avance } from './../../models/Avance';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  private _loginURL = "http://localhost:4000";

  constructor(
    private http:HttpClient
  ) { }

  // Metodo de obtencion por id. 
  getById(id: number){
    return this.http.post<any>(`${this._loginURL}/avanceById`, {id: id})
  }

  // Metodo de creacion de avance.  
  create(adv: Avance) {
    return this.http.post<any>(`${this._loginURL}/avances`, adv)
  }

  // Metodo de actualizacion de avance. 
  update(adv: Avance) {
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
}