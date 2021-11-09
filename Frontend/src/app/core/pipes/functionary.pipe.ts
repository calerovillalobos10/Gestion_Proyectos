import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'functionary'
})
export class FunctionaryPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    let result: string = '';

    switch (value) {
      case 1:
        result = 'Aplicativo'
        break;

      case 2:
        result = 'Responsable'
        break;

      case 3:
        result = 'Final'
        break;

      default:
        result = 'Indefinido'
        break;
    }

    return result;
  }

}
