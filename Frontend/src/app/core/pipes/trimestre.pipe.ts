import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimestre'
})
export class TrimestrePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    let result: string = '';
   
    switch (value) {
      case 1:
        result = 'Primer trimestre' //'Primer trimestre ( Enero - Febrero - Marzo )'
        break;

      case 2:
        result = 'Segundo trimestre' // 'Segundo trimestre ( Abril - Mayo - Junio )'
        break;

      case 3:
        result = 'Tercer trimestre' // 'Tercer trimestre ( Julio - Agosto - Setiembre )'
        break;

      case 4:
        result = 'Cuarto trimestre' // 'Cuarto trimestre ( Octubre - Noviembre - Diciembre )'
        break;

      default:
        result = 'Indefinido'
        break;
    }

    return result;
  }

}
