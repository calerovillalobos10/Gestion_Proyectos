import { HttpClient } from '@angular/common/http';
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
  getById(id: any){
    return this.http.post<any>(`${this._loginURL}/funcionarioById`, {id: id})
  }

  // Metodo de creacion de funcionario.  
  create(adv: FormData) {
    return this.http.post<any>(`${this._loginURL}/funcionarios`, adv)
  }

  // Metodo de actualizacion de funcionario. 
  update(adv: FormData) {
    return  this.http.put<any>(`${this._loginURL}/funcionarios`, adv)
  }

  // Elimina un funcionario por id     
  deleteById(id: number) {
    return this.http.post<any>(`${this._loginURL}/deleteFuncionarios`, {id: id})
  }

  //Obtiene todas los funcionarios     
  getAll(){
    return this.http.get<any>(`${this._loginURL}/funcionarios`)
  }

  // Devuelve si existe un correo o no.
  validateEmail(email:string) {
    return this.http.post<any>(`${this._loginURL}/email`, {correo: email})
  }

  /*
    Filtra segun el tipo
    1. Aplicativo
    2. Responsable
    3. Final
  */
    filterFunctionary(all:any, type: number){
      return all.filter((element:any) => element.tipoFuncionario === type)
    }
}