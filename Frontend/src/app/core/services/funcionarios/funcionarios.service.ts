import { HttpClient } from '@angular/common/http';
import { Funcionario } from './../../models/Funcionario';
import { Injectable, Output, EventEmitter } from '@angular/core';

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
    private http: HttpClient
  ) { }

  // Metodo de obtencion por id.
  // Obtiene solo un funcionario.
  getById(id: number) {
    let funcionario = undefined;

    this.http.get<any>(`${this._loginURL}/funcionarios/${id}`).subscribe((res) => {
      funcionario = res['mensaje'] ? undefined : res['dataBD']
    }, (err) => {
      funcionario = undefined
    })

    return funcionario;
  }

  // Metodo de creacion de funcionarios.
  // Envia todos los datos del funcionario.
  create(dept: Funcionario) {
    let status: boolean = false;

    this.http.post<any>(`${this._loginURL}/funcionarios`, dept).subscribe(
      (res) => {
        status = res['estado'];
      },
      (err) => {
        status = false;
      })

    return status;
  }

  // Metodo de actualizacion de funcionarios.
  // Envia id y datos nuevos del funcionario.
  update(dept: Funcionario) {
    let status: boolean = false;

    this.http.put<any>(`${this._loginURL}/funcionarios`, dept).subscribe(
      (res) => {
        status = res['estado'];
      },
      (err) => {
        status = false;
      })

    return status;
  }

  deleteById(id: number) {
    let status: boolean = false;

    this.http.delete<any>(`${this._loginURL}/funcionarios/${id}`).subscribe(
        (res)=>{   
          status = res['estado'];
        },
        (err)=>{
          status = false;
        },)
      
    return status;
  }

  getAll() {
    let funcionarios: Array<Funcionario> = [];

    this.http.get<any>(`${this._loginURL}/funcionarios`).subscribe(
      (res)=>{
        funcionarios = res['mensaje'] ? [] : res['dataBD'];
      },
      (err)=>{
        funcionarios = []
      },)
      
    return funcionarios;
  }
}