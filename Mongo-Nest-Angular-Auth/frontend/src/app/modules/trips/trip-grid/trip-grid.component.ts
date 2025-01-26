import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable } from 'rxjs'

import { Trip } from '~/app/types/trip.types'
import { fadeAnimation } from '~/app/utils/animations'
import { DateFormat } from '~/app/types/date-format'

@Component({
  selector: 'tp-trip-grid',
  animations: [fadeAnimation({ in: '.2s .3s', out: '.2s' })],
  template: `
    <tp-trip-card
      @fade
      *ngFor="let trip of trips | async"
      [trip]="trip"
      [dateFormat]="dateFormat"
      (open)="open.emit($event)"
      (edit)="edit.emit($event)"
      (duplicate)="duplicate.emit($event)"
      (delete)="delete.emit($event)"
      (printView)="printView.emit($event)"
    ></tp-trip-card>
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, 344px);
        justify-content: center;
        margin: 0 auto;
        max-width: 1080px;
        grid-gap: 24px;
      }
    `
  ]
})
export class TripGridComponent {
  @Input() public trips: Observable<Trip[]>
  @Input() public dateFormat: DateFormat

  @Output() public open: EventEmitter<string> = new EventEmitter<string>()
  @Output() public edit: EventEmitter<string> = new EventEmitter<string>()
  @Output() public duplicate: EventEmitter<string> = new EventEmitter<string>()
  @Output() public delete: EventEmitter<string> = new EventEmitter<string>()
  @Output() public printView: EventEmitter<string> = new EventEmitter<string>()

  constructor() {}
}
