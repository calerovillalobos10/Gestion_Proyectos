import { HttpClient } from '@angular/common/http';
import { Departamento } from '../../models/Departamento';
import { Injectable, Output, EventEmitter } from '@angular/core';

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
    private http: HttpClient
  ) { }


  // Metodo de obtencion por id.
  // Obtiene solo un departamento.

  getById(id: number): Departamento | undefined {
    let departament = undefined;
    const res = this.http.get<any>(`${this._loginURL}/departamentos/${id}`).subscribe(
      (res) => {
        departament = res['mensaje'] ? [] : res['dataBD'];
      },
      (err) => {
        departament = undefined;
      })
    return departament;
  }

  // Metodo de creacion de departamento.
  // Envia solo descripcion del departamento.
  create(dept: Departamento) {
    let status: boolean = false;

    this.http.post<any>(`${this._loginURL}/departamentos`, dept).subscribe(
      (res) => {
        status = res['estado'];
      },
      (err) => {
        status = false;
      })

    return status;
  }

  // Metodo de actualizacion de departamento.
  // Envia id y descripcion nueva del departamento.
  update(dept: Departamento) {
    let status: boolean = false;

      this.http.put<any>(`${this._loginURL}/departamentos`, dept).subscribe(
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

    this.http.delete<any>(`${this._loginURL}/departamentos/${id}`).subscribe(
      (res)=>{
        status = res['estado'];
      },
      (err)=>{
        status = false;
      })
   
    return status;
  }

  getAll(): Array<Departamento> {
    let departaments: Array<Departamento> = [];
    this.http.get<any>(`${this._loginURL}/departamentos`).subscribe(
      (res) => {
        departaments = res['mensaje'] ? [] : res['dataBD'];
      },
      (err) => {
        departaments = []
      }
    )
      
    return departaments;
  }
  
}