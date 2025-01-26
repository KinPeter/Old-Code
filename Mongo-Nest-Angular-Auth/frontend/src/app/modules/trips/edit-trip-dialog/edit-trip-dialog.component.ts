import { Component, Inject, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatChipInputEvent } from '@angular/material/chips'
import { COMMA, ENTER } from '@angular/cdk/keycodes'

import { Trip, TripBase } from '~/app/types/trip.types'
import { MyTripsService } from '~/app/services/trips/my-trips.service'
import { asUTC, TOMORROW } from '~/app/utils/date.utils'
import { CustomValidators } from '~/app/utils/custom-validators'

@Component({
  selector: 'tp-edit-trip-dialog',
  template: `
    <ng-container *ngIf="isEditMode">
      <mat-card-title>{{ 'myTrips.editTripDialog.editTitle' | translate }}</mat-card-title>
      <mat-card-subtitle>{{ 'myTrips.editTripDialog.editSubtitle' | translate }}</mat-card-subtitle>
    </ng-container>
    <ng-container *ngIf="!isEditMode">
      <mat-card-title>{{ 'myTrips.editTripDialog.createNewTitle' | translate }}</mat-card-title>
      <mat-card-subtitle>
        {{ 'myTrips.editTripDialog.createNewSubtitle' | translate }}
      </mat-card-subtitle>
    </ng-container>

    <form (ngSubmit)="onSubmit()" [formGroup]="form">
      <mat-form-field fullWidth>
        <mat-label>{{ 'myTrips.editTripDialog.title' | translate }}</mat-label>
        <input matInput type="text" formControlName="title" required />
        <mat-error *ngIf="form.get('title').hasError('required')">
          {{ 'myTrips.editTripDialog.titleRequired' | translate }}
        </mat-error>
        <mat-error
          *ngIf="form.get('title').hasError('minlength') || form.get('title').hasError('maxlength')"
        >
          {{ 'myTrips.editTripDialog.titleLength' | translate }}
        </mat-error>
      </mat-form-field>

      <mat-form-field fullWidth formGroupName="dates">
        <mat-label>{{ 'myTrips.editTripDialog.dates' | translate }}</mat-label>
        <mat-date-range-input
          [rangePicker]="picker"
          [min]="isEditMode ? null : tomorrow"
          [required]="!isEditMode"
          [disabled]="isEditMode"
        >
          <input matStartDate formControlName="startingDate" (focus)="picker.open()" />
          <input matEndDate formControlName="endingDate" (focus)="picker.open()" />
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
        <mat-error *ngIf="areDatesInvalid()">
          {{ 'myTrips.editTripDialog.datesInvalid' | translate }}
        </mat-error>
      </mat-form-field>

      <mat-form-field fullWidth>
        <mat-label>{{ 'myTrips.editTripDialog.countries' | translate }}</mat-label>
        <mat-chip-list #chipList formControlName="countries" required>
          <mat-chip
            *ngFor="let country of form.get('countries').value"
            selectable
            removable
            (removed)="removeCountry(country)"
          >
            {{ country }}
            <mat-icon matChipRemove>cancel</mat-icon>
          </mat-chip>
          <input
            [matChipInputFor]="chipList"
            [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
            matChipInputAddOnBlur
            (matChipInputTokenEnd)="addCountry($event)"
            (focus)="showCountryHint = true"
            (focusout)="showCountryHint = false"
          />
        </mat-chip-list>
        <mat-hint *ngIf="showCountryHint">
          {{ 'myTrips.editTripDialog.countriesHint' | translate }}
        </mat-hint>
        <mat-error *ngIf="form.get('countries').hasError('arrayEmpty')">
          {{ 'myTrips.editTripDialog.countriesRequired' | translate }}
        </mat-error>
      </mat-form-field>

      <tp-trip-image-uploader
        [imageUrl]="imageUrl"
        (imageChange)="onImageChange($event)"
      ></tp-trip-image-uploader>

      <div class="actions">
        <button mat-button type="button" (click)="onCancel()">
          {{ 'myTrips.editTripDialog.cancel' | translate | uppercase }}
        </button>
        <button mat-flat-button color="primary" type="submit" [disabled]="!form.valid">
          {{ 'myTrips.editTripDialog.save' | translate | uppercase }}
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .actions {
        text-align: right;
      }
    `
  ]
})
export class EditTripDialogComponent implements OnInit {
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA]
  public readonly tomorrow = TOMORROW
  public showCountryHint = false
  public isEditMode = false
  public imageUrl: string
  public form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<EditTripDialogComponent>,
    private formBuilder: FormBuilder,
    private myTripsService: MyTripsService,
    @Inject(MAT_DIALOG_DATA) public data: Trip
  ) {
    this.isEditMode = !!Object.entries(this.data).length
    this.imageUrl = this.data?.coverImageUrl || null
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [
        this.isEditMode ? this.data.title : '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      countries: [
        this.isEditMode ? [...this.data.countries] : [],
        [CustomValidators.arrayNotEmpty]
      ],
      dates: this.formBuilder.group(
        {
          startingDate: [this.isEditMode ? this.data.startingDate : null, Validators.required],
          endingDate: [this.isEditMode ? this.data.endingDate : null, Validators.required]
        },
        { validators: [CustomValidators.validDateRange, Validators.required] }
      ),
      coverImageUrl: [this.isEditMode ? this.data.coverImageUrl : null, CustomValidators.url]
    })
  }

  public addCountry(event: MatChipInputEvent): void {
    if (event.value.trim()) {
      this.form.get('countries').patchValue([...this.form.value.countries, event.value.trim()])
    }
    event.input.value = '' // Reset the input value
  }

  public removeCountry(country: string): void {
    this.form.get('countries').patchValue(this.form.value.countries.filter(c => c !== country))
  }

  public areDatesInvalid(): boolean {
    const datesInput: AbstractControl = this.form.get('dates')
    return (
      datesInput.hasError('required') ||
      datesInput.hasError('invalidDates') ||
      datesInput.get('startingDate').hasError('required') ||
      datesInput.get('endingDate').hasError('required')
    )
  }

  public onImageChange(url: string): void {
    this.imageUrl = url
    this.form.get('coverImageUrl').setValue(url)
  }

  public async onSubmit(): Promise<void> {
    if (this.isEditMode) {
      await this.myTripsService.updateTrip(this.data.id, this.getTripBaseInfo())
    } else {
      await this.myTripsService.createTrip(this.getTripBaseInfo())
    }
    this.dialogRef.close()
  }

  public onCancel(): void {
    this.dialogRef.close()
  }

  private getTripBaseInfo(): TripBase {
    return {
      title: this.form.value.title,
      countries: [...this.form.value.countries],
      startingDate: asUTC(this.form.value.dates.startingDate),
      endingDate: asUTC(this.form.value.dates.endingDate),
      coverImageUrl: this.form.value.coverImageUrl
    }
  }
}
