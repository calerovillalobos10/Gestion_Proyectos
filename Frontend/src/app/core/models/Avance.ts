import { Solicitud } from '@core/models/Solicitud';

export interface Avance{
  idAvance?:number;
  trimestre:number | string,
  funcionarioAplicativo:number | string, 
  fechaAvance:string,
  solicitud: number,
  documento:any,
} 