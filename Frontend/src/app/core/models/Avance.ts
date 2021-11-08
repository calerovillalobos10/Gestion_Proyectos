import { Solicitud } from '@core/models/Solicitud';

export interface Avance{
  idAvance?:number;
  trimestre:string;
  funcionarioAplicativo:number | string, 
  fehaAvance:string,
  solicitud: number,
  documento:any,
} 