import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'translate'
})
export class MockTranslatePipe implements PipeTransform {
  public name = 'translate'

  public transform(query: string, ...args: any[]): string {
    return query
  }
}
