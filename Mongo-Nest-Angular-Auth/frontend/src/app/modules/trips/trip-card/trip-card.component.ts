import { Component, EventEmitter, Input, Output } from '@angular/core'

import { Trip } from '~/app/types/trip.types'
import { DateFormat } from '~/app/types/date-format'

@Component({
  selector: 'tp-trip-card',
  template: `
    <mat-card>
      <img
        *ngIf="!trip.coverImageUrl"
        mat-card-image
        class="image-placeholder"
        src="./assets/svg/curvypath.svg"
        alt="Image placeholder"
        (click)="open.emit(trip.id)"
      />
      <img
        *ngIf="trip.coverImageUrl"
        mat-card-image
        [src]="trip.coverImageUrl"
        [alt]="trip.title"
        (click)="open.emit(trip.id)"
      />
      <mat-card-header>
        <mat-card-title (click)="open.emit(trip.id)">{{ trip.title }}</mat-card-title>
        <mat-card-subtitle>
          {{ trip.startingDate | date: dateFormat }} - {{ trip.endingDate | date: dateFormat }}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          <span *ngFor="let country of trip.countries; let i = index">
            {{ country | addComma: i:trip.countries.length }}
          </span>
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary" (click)="open.emit(trip.id)">
          {{ 'myTrips.open' | translate | uppercase }}
        </button>
        <button
          mat-icon-button
          [matTooltip]="'myTrips.more' | translate"
          [matMenuTriggerFor]="moreMenu"
        >
          <mat-icon>more_vert</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
    <mat-menu #moreMenu="matMenu">
      <button mat-menu-item (click)="edit.emit(trip.id)">
        <mat-icon>edit_location</mat-icon>
        {{ 'myTrips.edit' | translate }}
      </button>
      <button mat-menu-item (click)="duplicate.emit(trip.id)">
        <mat-icon>content_copy</mat-icon>
        {{ 'myTrips.duplicate' | translate }}
      </button>
      <button mat-menu-item (click)="delete.emit(trip.id)">
        <mat-icon>delete</mat-icon>
        {{ 'myTrips.delete' | translate }}
      </button>
      <button mat-menu-item (click)="printView.emit(trip.id)">
        <mat-icon>print</mat-icon>
        {{ 'myTrips.printView' | translate }}
      </button>
    </mat-menu>
  `,
  styles: [
    `
      img[mat-card-image] {
        height: 194px;
        cursor: pointer;
      }
      .image-placeholder {
        filter: grayscale(1) opacity(0.6);
        background: var(--color-black-10);
      }
      mat-card-title {
        cursor: pointer;
      }
      mat-card-content {
        margin: 0 16px;
      }
      mat-card-actions {
        margin: 0;
        display: flex;
        justify-content: space-between;
      }
    `
  ]
})
export class TripCardComponent {
  @Input() public trip: Trip
  @Input() public dateFormat: DateFormat

  @Output() public open: EventEmitter<string> = new EventEmitter<string>()
  @Output() public edit: EventEmitter<string> = new EventEmitter<string>()
  @Output() public duplicate: EventEmitter<string> = new EventEmitter<string>()
  @Output() public delete: EventEmitter<string> = new EventEmitter<string>()
  @Output() public printView: EventEmitter<string> = new EventEmitter<string>()

  constructor() {}
}
