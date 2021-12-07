export interface Solicitud{

  idSolicitud?:number;
  funcionario_responsable:number | string,
  funcionario_aplicativo:number| string,
  funcionario_final:number| string,
  fechaSolicitud:string,
  fechaInicio:string,
  fechaFin:string,
  documentoActa:any,
  progreso?: number,
  terminado?: boolean
} 