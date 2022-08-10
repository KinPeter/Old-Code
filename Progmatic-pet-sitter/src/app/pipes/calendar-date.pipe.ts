import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendarDate'
})
export class CalendarDatePipe implements PipeTransform {

  transform(date: string): string {
    const numbers = date.split('.');
    const monthAndDay = numbers[1] + '.' + numbers[2];
    return monthAndDay;
  }

}
