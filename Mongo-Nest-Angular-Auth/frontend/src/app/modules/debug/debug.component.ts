import { Component, OnInit } from '@angular/core'
import { getDateArray } from '~/app/utils/date.utils'

@Component({
  selector: 'tp-debug',
  template: ``,
  styles: [``]
})
export class DebugComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const start = new Date('2020.11.23')
    const end = new Date('2020.12.03')
    const arr = getDateArray(start, end)
    console.log('dates:', arr)
  }
}
