import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNum'
})
export class ShortNumberPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    let exp, rounded,
      suffixes = ['', 'K', 'M', 'B', 'T' ];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log10(input) / 3);
    rounded = input / Math.pow(10, exp * 3);

    return rounded.toFixed(1) + suffixes[exp];
  }

}
