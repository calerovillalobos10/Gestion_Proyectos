import { API_URL } from '@core/others/Enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BitacorasService {

  // Emite la comunicacion entre componente modal y de lista para mostrar el modal
  @Output() modalNeeded: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  // Metodo de obtencion por id.
  // Obtiene solo un departamento.
  getById(id: number){
    return this.http.post<any>(`${API_URL}/bitacoraById/`, {id: id})
  }

  // Metodo de listado de departamentos.
  // Obtiene todos los departamentos.
  getAll() {
    return this.http.get<any>(`${API_URL}/listBitacoras`)
  }
  
}