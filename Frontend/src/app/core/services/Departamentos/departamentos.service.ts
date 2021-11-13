import { API_URL } from '@core/others/Enviroment';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../../models/Departamento';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  // Emite la comunicacion entre componente modal y de lista para mostrar el modal
  @Output() modalNeeded: EventEmitter<any> = new EventEmitter();

  // Emite la comunicacion entre el modal y la lista para indicar que se registro el funcionario
  @Output() updateNeeded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  // Metodo de obtencion por id.
  // Obtiene solo un departamento.
  getById(id: number){
    return this.http.post<any>(`${API_URL}/departmentById/`, {id: id})
  }

  // Metodo de creacion de departamento.
  // Envia solo descripcion del departamento.
  create(dept: Departamento) {
    return this.http.post<any>(`${API_URL}/department`, dept)
  }

  // Metodo de actualizacion de departamento.
  // Envia id y descripcion nueva del departamento.
  update(dept: Departamento) {
    return this.http.put<any>(`${API_URL}/department`, {id: dept.idDepartamento, descripcion: dept.descripcion});
  }

  // Metodo de eliminación de departamento.
  // Envia id del departamento.
  deleteById(id: number) {
    return this.http.post<any>(`${API_URL}/deleteDepartment`, {id: id})
  }

  // Metodo de listado de departamentos.
  // Obtiene todos los departamentos.
  getAll() {
    return this.http.get<any>(`${API_URL}/listDepartment`)
  }
  
}