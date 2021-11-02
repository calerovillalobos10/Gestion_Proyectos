import { HttpClient } from '@angular/common/http';
import { Funcionario } from './../../models/Funcionario';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private _loginURL = "http://localhost:4000";

  // Emite la comunicacion entre componente modal y de lista para mostrar el modal
  @Output() modalNeeded: EventEmitter<any> = new EventEmitter();

  // Emite la comunicacion entre el modal y la lista para indicar que se registro el funcionario
  @Output() updateNeeded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient
  ) { }


  // Metodo de obtencion por id.
  // Obtiene solo un funcionario.

  async getById(id:number){
    let funcionario = undefined;

    try {
      const res = await this.http.get<any>(`${this._loginURL}/funcionarios/${id}`)
      .pipe(timeout(5000)).toPromise();
      funcionario = res['mensaje'] ? undefined : res['dataBD']
    } catch (e) {
      funcionario = undefined
    }
    return funcionario;
  }


  // Metodo de creacion de funcionarios.
  // Envia todos los datos del funcionario.
  async create(dept:Funcionario){
    let status:boolean = false;

    try {
      const res = await this.http.post<any>(`${this._loginURL}/funcionarios`, dept)
      .pipe(timeout(5000)).toPromise();
      status =  res['estado'];
    } catch (e) {
      status = false;
    }
    
    return status;
  }

  // Metodo de actualizacion de funcionarios.
  // Envia id y datos nuevos del funcionario.
  async update(dept:Funcionario){
    let status:boolean = false;

    try {
      const res = await this.http.put<any>(`${this._loginURL}/funcionarios`, dept)
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
      const res = await this.http.delete<any>(`${this._loginURL}/funcionarios/${id}`)
      .pipe(timeout(5000)).toPromise();
      status =  res['estado'];
    } catch (e) {
      status = false;
    }
    
    return status;
  }

  async getAll(){
    let funcionarios = [];
    try {
      const res = await this.http.get<any>(`${this._loginURL}/funcionarios`)
      .pipe(timeout(5000)).toPromise();
      funcionarios =  res['mensaje'] ? [] : res['dataBD'];
      
    } catch (e) {
      funcionarios = []
    }

    return funcionarios;
  }
}