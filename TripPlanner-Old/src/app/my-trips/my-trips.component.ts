import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TripHeaderResource } from '~/app/types/trip.types';
import { TripService } from '~/app/services/trips/trip.service';
import { UserService } from '~/app/services/user-auth/user.service';
import { DateFormat } from '~/app/shared/date-format';

@Component({
  selector: 'tp-my-trips',
  template: `
    <div class="my-trips-container">
      <h2 class="mt-4">{{ userName }}'s trips</h2>

      <div class="filters">
        <mat-form-field appearance="outline">
          <mat-label>Filter by title or country</mat-label>
          <input
            matInput
            [(ngModel)]="filter"
            type="text"
            autocomplete="off"
            data-tp-test="my-trips-text-filter"
            (input)="onTextChange()"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Filter by year</mat-label>
          <mat-select
            [(ngModel)]="selectedYear"
            (selectionChange)="onYearChange()"
            data-tp-test="my-trips-year-filter"
          >
            <mat-option [value]="-1">All</mat-option>
            <mat-option *ngFor="let year of years" [value]="year">
              {{ year }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="checkbox">
        <mat-checkbox
          [(ngModel)]="futureOnly"
          labelPosition="before"
          data-tp-test="my-trips-future-only"
          (change)="onFutureOnlyChange()"
        >
          Show future trips only
        </mat-checkbox>
      </div>

      <div class="not-found" *ngIf="filteredTrips && !filteredTrips.length">
        <p>No trips found 😕</p>
        <small>Please check the applied filters or create a new trip!</small>
      </div>

      <tp-my-trips-list
        *ngIf="filteredTrips && filteredTrips.length"
        [filteredTrips]="filteredTrips"
        [preferredDateFormat]="preferredDateFormat"
        (deleteTrip)="onDeleteTrip($event)"
      ></tp-my-trips-list>
    </div>
  `,
  styles: [
    `
      .my-trips-container {
        padding-left: 1rem;
        max-width: 700px;
      }

      .my-trips-container .filters {
        display: flex;
      }

      .my-trips-container .filters mat-form-field:first-child {
        flex-grow: 1;
      }

      .my-trips-container .checkbox {
        margin-bottom: 1rem;
        margin-top: -0.5rem;
        padding-right: 0.5rem;
        text-align: right;
        color: var(--color-text-light);
      }

      .my-trips-container .not-found {
        color: var(--color-text-light);
        text-align: center;
        padding-top: 1rem;
      }
    `,
  ],
})
export class MyTripsComponent implements OnInit, OnDestroy {
  public userSub: Subscription;
  public userName: string;
  public preferredDateFormat: DateFormat;
  public trips: TripHeaderResource[];
  public filteredTrips: TripHeaderResource[];
  public years: number[];
  public filter: string;
  public selectedYear: number;
  public futureOnly = true;

  constructor(private tripService: TripService, private userService: UserService) {
    this.initData();
  }

  ngOnInit() {
    this.userSub = this.userService.currentUser.subscribe(user => {
      this.userName = user.displayName;
      this.preferredDateFormat = user.preferredDateFormat;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onYearChange(): void {
    if (this.selectedYear > 0) {
      this.filteredTrips = this.filterFutureOnly(this.filterByYear(this.trips, this.selectedYear));
    } else {
      this.filteredTrips = this.filterFutureOnly([...this.trips]);
    }
    if (this.filter) {
      this.filter = null;
    }
  }

  onTextChange(): void {
    if (this.filter.length > 2) {
      this.filteredTrips = this.filterFutureOnly(this.filterByText(this.trips, this.filter));
    } else if (!this.filter) {
      this.filteredTrips = this.filterFutureOnly([...this.trips]);
    }
    if (this.selectedYear) {
      this.selectedYear = null;
    }
  }

  onFutureOnlyChange(): void {
    if ((!this.filter || this.filter.length < 3) && (!this.selectedYear || this.selectedYear < 0)) {
      this.filteredTrips = this.filterFutureOnly(this.trips);
    } else if (!!this.filter && this.filter.length > 2) {
      this.filteredTrips = this.filterFutureOnly(this.filterByText(this.trips, this.filter));
    } else if (!!this.selectedYear && this.selectedYear > 0) {
      this.filteredTrips = this.filterFutureOnly(this.filterByYear(this.trips, this.selectedYear));
    } else {
      this.filteredTrips = this.filterFutureOnly(this.filteredTrips);
    }
  }

  async onDeleteTrip(tripId: string): Promise<void> {
    await this.tripService.delete(tripId);
    await this.initData();
  }

  filterByYear(trips: TripHeaderResource[], year: number): TripHeaderResource[] {
    return trips.filter(trip => {
      return new Date(trip.startingDate).getFullYear() === year;
    });
  }

  filterByText(trips: TripHeaderResource[], text: string): TripHeaderResource[] {
    return trips.filter(trip => {
      return (
        trip.title.toLowerCase().includes(text.toLowerCase()) ||
        trip.countries.some(c => c.toLowerCase().includes(text.toLowerCase()))
      );
    });
  }

  filterFutureOnly(trips: TripHeaderResource[]): TripHeaderResource[] {
    if (this.futureOnly) {
      const now = new Date();
      return trips.filter(trip => {
        return new Date(trip.startingDate) > now;
      });
    } else {
      return trips;
    }
  }

  private async initData(): Promise<void> {
    this.trips = await this.tripService.getTripHeaders();
    this.filteredTrips = this.filterFutureOnly([...this.trips]);
    const allYears = this.trips.map(trip => {
      return new Date(trip.startingDate).getFullYear();
    });
    this.years = [...new Set(allYears)];
    this.selectedYear = undefined;
    this.filter = undefined;
    this.futureOnly = true;
  }
}
