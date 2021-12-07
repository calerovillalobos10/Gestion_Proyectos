export interface Funcionario{
  idFuncionario?:number,
  nombre:string,
  apellido_1:string,
  apellido_2:string,
  correo:string,
  idDepartamento:number | string,
  fechaNacimiento:string,
  idSexo:number | string,
  idTipoFuncionario:number | string,
  contrasenia?:string,
  urlFoto:any
}