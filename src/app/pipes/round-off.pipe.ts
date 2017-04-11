import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundOff'
})
export class RoundOffPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const decimalPoints = parseInt(args[0],10) || 0;
    value += '';
    if (value.length > 0) {
      return parseFloat(value).toFixed(decimalPoints);
    } else {
      return 0;
    }
  }

}
