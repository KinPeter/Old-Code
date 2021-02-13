import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addComma' })
export class CommaPipe implements PipeTransform {
  transform(value: string, index: number, length: number): string {
    if (index < length - 1) {
      return value + ',';
    } else {
      return value;
    }
  }
}
