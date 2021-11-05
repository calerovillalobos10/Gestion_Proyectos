import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Solicitud } from '@core/models/Solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudeService {

  private _loginURL = "http://localhost:4000";

  constructor(
    private http:HttpClient
  ) { }

  // Metodo de obtencion por id.  METHOD: Get/:id

  getById(id: number): Solicitud | undefined {
    let solicitud = undefined;
    const res = this.http.get<any>(`${this._loginURL}/solicitudes/${id}`).subscribe(
      (res) => {
        solicitud = res['mensaje'] ? [] : res['dataBD'];
      },
      (err) => {
        solicitud = undefined;
      })
    return solicitud;
  }

  // Metodo de creacion de solicitud.  METHOD: Post
  
  create(dept: Solicitud) {
    let status: boolean = false;

    this.http.post<any>(`${this._loginURL}/solicitudes`, dept).subscribe(
      (res) => {
        status = res['estado'];
      },
      (err) => {
        status = false;
      })

    return status;
  }

  // Metodo de actualizacion de solicitud.  METHOD: Put

  update(dept: Solicitud) {
    let status: boolean = false;

      this.http.put<any>(`${this._loginURL}/solicitudes`, dept).subscribe(
        (res) => {
          status = res['estado'];
         },
        (err) => {
          status = false;
        })
    return status;
  }

  // Elimina una solicitud por id     METHOD: Delete

  deleteById(id: number) {
    let status: boolean = false;

    this.http.delete<any>(`${this._loginURL}/solicitudes/${id}`).subscribe(
      (res)=>{
        status = res['estado'];
      },
      (err)=>{
        status = false;
      })
   
    return status;
  }

  //Obtiene todas las solicitudes     METHOD: Get
  
  getAll(): Array<Solicitud> {
    let solicitudes: Array<Solicitud> = [];
    this.http.get<any>(`${this._loginURL}/solicitudes`).subscribe(
      (res) => {
        solicitudes = res['mensaje'] ? [] : res['dataBD'];
      },
      (err) => {
        solicitudes = []
      }
    )
    return solicitudes;
  }
}