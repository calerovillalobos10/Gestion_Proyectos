export interface Funcionario{
  idFuncionario?:number,
  nombre:string,
  apellido1:string,
  apellido2:string,
  correo:string,
  idDepartamento:number | string,
  fechaNacimiento:string,
  idSexo:number | string,
  idTipoFuncionario:number | string,
  contrasenia?:string,
  urlFoto:string | ArrayBuffer | null | undefined;
}