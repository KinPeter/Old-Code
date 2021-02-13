import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DateFormat } from '~/app/shared/date-format';
import { TripHeaderResource } from '~/app/types/trip.types';

@Component({
  selector: 'tp-my-trips-list',
  template: `
    <mat-accordion class="my-trips-list">
      <mat-expansion-panel *ngFor="let trip of filteredTrips" data-tp-test="my-trips-list-item">
        <mat-expansion-panel-header>
          <mat-panel-title>{{ trip.title }}</mat-panel-title>
        </mat-expansion-panel-header>
        <p>
          {{ trip.startingDate | date: preferredDateFormat }} -
          {{ trip.endingDate | date: preferredDateFormat }}
        </p>
        <p>
          <span *ngFor="let country of trip.countries; let i = index">
            {{ country | addComma: i:trip.countries.length }}
          </span>
        </p>

        <mat-action-row *ngIf="!confirming" data-tp-test="my-trips-list-item-action-row">
          <button mat-button color="primary" [routerLink]="'/planner/' + trip.tripId">
            Open in Planner
          </button>
          <button mat-button>
            Print view
          </button>
          <button mat-button>
            Mobile view
          </button>
          <button mat-button color="warn" (click)="confirming = true">
            Delete trip
          </button>
        </mat-action-row>
        <mat-action-row
          *ngIf="confirming"
          class="align-items-center"
          data-tp-test="my-trips-list-item-delete-confirmation"
        >
          <span class="flex-grow-1">Are you sure? This cannot be undone!</span>
          <button mat-button (click)="confirming = false">
            I've changed my mind
          </button>
          <button mat-button color="warn" (click)="onDeleteTrip(trip.tripId)">
            Yes, delete this trip
          </button>
        </mat-action-row>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [
    `
      .my-trip-list mat-expansion-panel-header.mat-expanded mat-panel-title {
        font-weight: bold;
      }
    `,
  ],
})
export class MyTripsListComponent {
  @Input() filteredTrips: TripHeaderResource[];
  @Input() preferredDateFormat: DateFormat;

  @Output() deleteTrip: EventEmitter<string> = new EventEmitter<string>();

  public confirming = false;

  constructor() {}

  onDeleteTrip(tripId: string): void {
    this.deleteTrip.emit(tripId);
  }
}
