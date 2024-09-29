import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'MMMM d, y');
    return formattedDate;
  }
}
