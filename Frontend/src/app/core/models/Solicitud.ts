
export interface Solicitud{
  idSolicitud?:number;
  funcionarioResponsable:number | string,
  funcionarioAplicativo:number| string,
  funcionarioFinal:number| string,
  fechaSolicitud:string,
  fechaInicio:string,
  fechaFin:string,
  documentoActa:any,
} 