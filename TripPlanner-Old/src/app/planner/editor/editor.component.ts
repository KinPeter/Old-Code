import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Trip } from '~/app/types/trip.types';
import { UserService } from '~/app/services/user-auth/user.service';
import { DateFormat } from '~/app/shared/date-format';
import { TripService } from '~/app/services/trips/trip.service';

@Component({
  selector: 'tp-editor',
  template: `
    <div class="editor-container">
      <tp-editor-toolbar
        *ngIf="!isNewTrip"
        [saveDisabled]="saveDisabled"
        (toggleMapView)="toggleMapView.emit()"
        (openPrintView)="openPrintView.emit()"
        (saveChanges)="saveChanges()"
      ></tp-editor-toolbar>

      <div class="editor">
        <tp-trip-header
          [trip]="trip"
          [preferredDateFormat]="preferredDateFormat"
          [isNewTrip]="isNewTrip"
        ></tp-trip-header>

        <button
          *ngIf="isNewTrip"
          mat-raised-button
          color="accent"
          style="display: block; width: 100%;"
          [disabled]="!canCreateNewTrip"
          (click)="createNewTrip()"
        >
          CREATE TRIP
        </button>

        <!--    TODO: Actual trip editor-->
        <!--    <ng-container *ngIf="!isNewTrip"></ng-container>-->

        <!--  <ng-container *ngIf="!isNewTrip">-->
        <!--    <mat-form-field class="mr-2">-->
        <!--      <input-->
        <!--        matInput-->
        <!--        placeholder="Latitude"-->
        <!--        [(ngModel)]="currentPosition.lat"-->
        <!--      />-->
        <!--    </mat-form-field>-->
        <!--    <mat-form-field>-->
        <!--      <input-->
        <!--        matInput-->
        <!--        placeholder="Longitude"-->
        <!--        [(ngModel)]="currentPosition.lon"-->
        <!--      />-->
        <!--    </mat-form-field>-->
        <!--    <br />-->
        <!--    <button-->
        <!--      mat-raised-button-->
        <!--      color="primary"-->
        <!--      class="mr-2"-->
        <!--      [disabled]="!currentPosition.lat || !currentPosition.lon"-->
        <!--      (click)="onClick()"-->
        <!--    >-->
        <!--      Add marker-->
        <!--    </button>-->
        <!--    <button-->
        <!--      mat-raised-button-->
        <!--      color="warn"-->
        <!--      [disabled]="!currentPosition.lat || !currentPosition.lon"-->
        <!--      (click)="onRemove()"-->
        <!--    >-->
        <!--      Remove marker-->
        <!--    </button>-->
        <!--  </ng-container>-->
      </div>
    </div>
  `,
  styles: [
    `
      .editor-container {
        width: 100%;
        height: 100%;
        padding: 1rem;
        position: relative;
      }

      .editor {
        margin-top: -1rem;
      }
    `,
  ],
})
export class EditorComponent implements OnInit, OnChanges, OnDestroy {
  public isNewTrip = false;
  public saveDisabled = true;
  public preferredDateFormat: string;
  public trip: Trip;

  private subscriptions: Subscription[] = [];

  @Input() tripId: string;

  @Output() toggleMapView: EventEmitter<void> = new EventEmitter<void>();
  @Output() openPrintView: EventEmitter<void> = new EventEmitter<void>();
  @Output() newTripCreated: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService, private tripService: TripService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.userService.currentUser.subscribe(data => {
        this.preferredDateFormat = data ? data.preferredDateFormat : DateFormat.DMY_LONG;
      }),
      this.tripService.trip.subscribe(data => {
        this.trip = data;
      }),
      this.tripService.hasChanges.subscribe(hasChanges => {
        this.saveDisabled = !hasChanges;
        // TODO: Add validation
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tripId) {
      this.initNewOrFetch();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  get canCreateNewTrip(): boolean {
    return this.trip
      ? this.trip.title &&
          this.trip.startingDate &&
          this.trip.endingDate &&
          new Date(this.trip.startingDate) <= new Date(this.trip.endingDate) &&
          this.trip.countries.length > 0
      : false;
  }

  saveChanges(): void {
    this.tripService.update(this.trip);
  }

  async createNewTrip(): Promise<void> {
    const response = await this.tripService.create({
      title: this.trip.title,
      startingDate: this.trip.startingDate,
      endingDate: this.trip.endingDate,
      countries: this.trip.countries,
      json: JSON.stringify({ days: [] }),
    });
    if (response.id) {
      this.newTripCreated.emit(response.id);
    }
  }

  private initNewOrFetch(): void {
    if (this.tripId === 'new') {
      this.isNewTrip = true;
      this.tripService.initNewTrip();
    } else {
      this.isNewTrip = false;
      setTimeout(() => {
        this.tripService.fetch(this.tripId);
      });
    }
  }
}
