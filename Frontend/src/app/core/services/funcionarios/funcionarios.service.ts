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
  create(funct: FormData) {
    let status: boolean = false;
    this.http.post<any>(`${this._loginURL}/funcionarios`, funct).subscribe(
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
  update(funct: FormData) {
    let status: boolean = false;

    this.http.post<any>(`${this._loginURL}/funcionarios`, funct).subscribe(
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
      (res) => {
        status = res['estado'];
      },
      (err) => {
        status = false;
      })

    return status;
  }

  getAll() {
    let funcionarios: Array<Funcionario> = [];

    this.http.get<any>(`${this._loginURL}/funcionarios`).subscribe(
      (res) => {
        funcionarios = res['mensaje'] ? [] : res['dataBD'];
      },
      (err) => {
        funcionarios = []
      })

    return fixedData;// Cambiar esto luego
    return funcionarios;
  }

  // Devuelve si existe un correo o no.
  validateEmail(email:string) {
    
    let status: boolean = false;
    this.http.post<any>(`${this._loginURL}/email`, {correo: email}).subscribe(
      (res) => {
        status = res['estado'];
      },
      (err) => {
        status = false;
      })

      return status;
  }

}

const fixedData:Array<Funcionario> = [
  {idFuncionario:1, nombre: 'Alberto', apellido1: 'Salas', apellido2: 'Rojas', idDepartamento: 'Legal', idSexo: 'Hombre', idTipoFuncionario: 'Final', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:2, nombre: 'Juan', apellido1: 'Leiton', apellido2: 'Ulate', idDepartamento: 'TI', idSexo: 'Hombre', idTipoFuncionario: 'Aplicativo', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:3, nombre: 'Marcos', apellido1: 'Brenes', apellido2: 'Elizondo', idDepartamento: 'RH', idSexo: 'Hombre', idTipoFuncionario: 'Aplicativo', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:4, nombre: 'Pedro', apellido1: 'Gomez', apellido2: 'Pereira', idDepartamento: 'Contabilidad', idSexo: 'Hombre', idTipoFuncionario: 'Responsable', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:5, nombre: 'Luis', apellido1: 'Herrera', apellido2: 'Hernandez', idDepartamento: 'TI', idSexo: 'Hombre', idTipoFuncionario: 'Responsable', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:6, nombre: 'Ana', apellido1: 'Pereira', apellido2: 'Rojas', idDepartamento: 'Medico', idSexo: 'Mujer', idTipoFuncionario: 'Final', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:7, nombre: 'Maria', apellido1: 'Gomez', apellido2: 'Brenes', idDepartamento: 'Seguridad', idSexo: 'Mujer', idTipoFuncionario: 'Responsable', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:8, nombre: 'Mario', apellido1: 'Herrera', apellido2: 'Primer apellido', idDepartamento: 'Ventas', idSexo: 'Hombre', idTipoFuncionario: 'Aplicativo', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:9, nombre: 'Geonathan', apellido1: 'Elizondo', apellido2: 'Primer apellido', idDepartamento: 'Ventas', idSexo: 'Hombre', idTipoFuncionario: 'Final', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:10, nombre: 'Abril', apellido1: 'Mata', apellido2: 'Palo', idDepartamento: 'RH', idSexo: 'Mujer', idTipoFuncionario: 'Final', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:11, nombre: 'Mufasa', apellido1: 'Reyes', apellido2: 'Iglesias', idDepartamento: 'Contabilidad', idSexo: 'Hombre', idTipoFuncionario: 'Aplicativo', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' },
{idFuncionario:13, nombre: 'Timon', apellido1: 'Salas', apellido2: 'Quito', idDepartamento: 'Gerencia', idSexo: 'Hombre', idTipoFuncionario: 'Responsable', correo: 'Luis@grs.com', fechaNacimiento: '18-05-95', urlFoto: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/foto-de-perfil-para-instagram-1024x538.png' }];