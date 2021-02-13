import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { Trip } from '~/app/types/trip.types';
import { TripService } from '~/app/services/trips/trip.service';
import { TripUtils } from '~/app/utils/trip.utils';

@Component({
  selector: 'tp-trip-header',
  template: `
    <div
      class="trip-title"
      (mouseenter)="showEditHeaderIcon = true"
      (mouseleave)="showEditHeaderIcon = false"
    >
      <h2>
        {{ trip?.title.length ? trip.title : '-' }}
        <mat-icon
          class="edit-header-icon"
          *ngIf="!isNewTrip && showEditHeaderIcon && !showEditor"
          matTooltip="Edit header"
          matTooltipPosition="right"
          (click)="showEditor = true"
        >
          edit
        </mat-icon>
        <mat-icon
          class="edit-header-icon"
          *ngIf="!isNewTrip && showEditHeaderIcon && showEditor"
          matTooltip="Close editor"
          matTooltipPosition="right"
          (click)="showEditor = false"
        >
          visibility_off
        </mat-icon>
      </h2>
    </div>

    <p *ngIf="isNewTrip">
      Please fill the form below to create your new trip.
      <br />
      <small><i>All of these fields can be modified later at any time.</i></small>
    </p>

    <div class="trip-header-details" *ngIf="trip && !showEditor">
      <p class="dates">
        {{ trip?.startingDate | date: preferredDateFormat }} -
        {{ trip?.endingDate | date: preferredDateFormat }}
      </p>
      <p class="country-list">
        <span class="country-list-item" *ngFor="let country of trip?.countries; let i = index">
          {{ country }}{{ i === trip?.countries.length - 1 ? '' : ',' }}
        </span>
      </p>
    </div>

    <mat-card *ngIf="trip && showEditor">
      <mat-form-field>
        <input
          matInput
          required
          minlength="3"
          maxlength="15"
          placeholder="Trip title"
          tripChangeCheck
          (focus)="showTitleHint = true"
          (focusout)="showTitleHint = false"
          [(ngModel)]="trip.title"
        />
        <mat-hint *ngIf="showTitleHint">Minimum 3, maximum 15 characters</mat-hint>
        <mat-error *ngIf="!trip.title">This field is required</mat-error>
        <mat-error *ngIf="trip.title && trip.title.length < 3">
          Title needs to be minimum 3 characters
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Travel date</mat-label>
        <mat-date-range-input [rangePicker]="picker" [min]="tomorrow" required>
          <input
            matStartDate
            placeholder="Start date"
            tripChangeCheck
            (focus)="picker.open()"
            [(ngModel)]="trip.startingDate"
          />
          <input
            matEndDate
            placeholder="End date"
            tripChangeCheck
            (focus)="picker.open()"
            [(ngModel)]="trip.endingDate"
          />
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>
      <mat-error *ngIf="areDatesInvalid" style="font-size: 75%; margin-top: -1rem;">
        Please enter valid dates
      </mat-error>
      <mat-form-field>
        <mat-chip-list #chipList>
          <mat-chip
            *ngFor="let country of trip.countries"
            selectable
            removable
            (removed)="removeCountry(country)"
          >
            {{ country }}
            <mat-icon matChipRemove>cancel</mat-icon>
          </mat-chip>
          <input
            placeholder="Countries"
            [matChipInputFor]="chipList"
            [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
            matChipInputAddOnBlur
            (matChipInputTokenEnd)="addCountry($event)"
            (focus)="showCountryHint = true"
            (focusout)="showCountryHint = false"
          />
        </mat-chip-list>
        <mat-hint *ngIf="showCountryHint">
          Type the country names separated by commas
        </mat-hint>
      </mat-form-field>
      <mat-error *ngIf="!trip.countries.length" style="font-size: 75%;">
        Please add at least one country
      </mat-error>
    </mat-card>
  `,
  styles: [
    `
      .trip-title {
        position: relative;
        width: calc(100% - 200px);
      }

      .trip-title h2 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .trip-title mat-icon {
        position: absolute;
        top: 3px;
        margin-left: 0.5rem;
        color: var(--color-light-grey);
        cursor: pointer;
      }

      .trip-title mat-icon:hover {
        color: var(--color-text-light);
      }

      .trip-header-details {
        margin-top: -1.2rem;
        margin-bottom: 1rem;
        font-size: 90%;
        color: var(--color-text-light);
      }

      .trip-header-details .dates {
        margin: 0;
        width: calc(100% - 200px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .trip-header-details .country-list {
        margin: 0;
      }

      .trip-header-details .country-list .country-list-item {
        text-transform: uppercase;
      }

      mat-card {
        margin: 2rem 0 1rem;
      }

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class TripHeaderComponent implements OnInit, OnChanges {
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public readonly tomorrow = TripUtils.tomorrow;

  @Input() trip: Trip;
  @Input() preferredDateFormat: string;
  @Input() isNewTrip: boolean;

  public showCountryHint = false;
  public showTitleHint = false;
  public showEditor = false;
  public showEditHeaderIcon = false;

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.showEditor = this.isNewTrip;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.trip && this.isNewTrip) {
      this.showEditor = true;
    } else if (this.trip && !this.isNewTrip) {
      this.showEditor = false;
    }
  }

  get areDatesInvalid(): boolean {
    return (
      !this.trip.startingDate ||
      !this.trip.endingDate ||
      new Date(this.trip.startingDate) > new Date(this.trip.endingDate)
    );
  }

  addCountry(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.trip.countries = [...this.trip.countries, value.trim()];
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.tripService.checkForChanges();
  }

  removeCountry(country: string): void {
    this.trip.countries = this.trip.countries.filter(c => c !== country);
    this.tripService.checkForChanges();
  }
}
