import { HttpClient } from '@angular/common/http';
import { Departamento } from './../../models/Departamento';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private _loginURL = "http://localhost:4000";

  // Emite la comunicacion entre componente modal y de lista para mostrar el modal
  @Output() modalNeeded: EventEmitter<any> = new EventEmitter();

  // Emite la comunicacion entre el modal y la lista para indicar que se registro el funcionario
  @Output() updateNeeded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient
  ) { }


  // Metodo de obtencion por id.
  // Obtiene solo un departamento.

  async getById(id:number){
    let departament = undefined;

    try {
      const res = await this.http.get<any>(`${this._loginURL}/departamentos/${id}`)
      .pipe(timeout(5000)).toPromise();
      departament = res['mensaje'] ? undefined : res['dataBD']
    } catch (e) {
      departament = undefined
    }
    return departament;
  }


  // Metodo de creacion de departamento.
  // Envia solo descripcion del departamento.
  async create(dept:Departamento){
    let status:boolean = false;

    try {
      const res = await this.http.post<any>(`${this._loginURL}/departamentos`, dept)
      .pipe(timeout(5000)).toPromise();
      status =  res['estado'];
    } catch (e) {
      status = false;
    }
    
    return status;
  }

  // Metodo de actualizacion de departamento.
  // Envia id y descripcion nueva del departamento.
  async update(dept:Departamento){
    let status:boolean = false;

    try {
      const res = await this.http.put<any>(`${this._loginURL}/departamentos`, dept)
      .pipe(timeout(5000)).toPromise();
      status =  res['estado'];
    } catch (e) {
      status = false;
    }
    
    return status;
  }

  async deleteById(id:number){
    let status:boolean = false;

    try {
      const res = await this.http.delete<any>(`${this._loginURL}/departamentos/${id}`)
      .pipe(timeout(5000)).toPromise();
      status =  res['estado'];
    } catch (e) {
      status = false;
    }
    
    return status;
  }

  async getAll(){
    let departaments = [];
    try {
      const res = await this.http.get<any>(`${this._loginURL}/departamentos`)
      .pipe(timeout(5000)).toPromise();
      departaments =  res['mensaje'] ? [] : res['dataBD'];
      
    } catch (e) {
      departaments = []
    }

    return departaments;
  }
}