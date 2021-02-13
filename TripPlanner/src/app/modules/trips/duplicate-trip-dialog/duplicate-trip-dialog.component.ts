import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { Trip } from '~/app/types/trip.types'
import { MyTripsService } from '~/app/services/trips/my-trips.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'tp-duplicate-trip-dialog',
  template: `
    <mat-card-title>{{ 'myTrips.duplicateTripDialog.dialogTitle' | translate }}</mat-card-title>
    <mat-card-subtitle>
      {{ 'myTrips.duplicateTripDialog.dialogSubtitle' | translate }}
    </mat-card-subtitle>

    <form (ngSubmit)="onSubmit()" [formGroup]="form">
      <mat-form-field fullWidth>
        <mat-label>{{ 'myTrips.duplicateTripDialog.title' | translate }}</mat-label>
        <input matInput type="text" formControlName="title" required />
        <mat-error *ngIf="form.get('title').hasError('required')">
          {{ 'myTrips.duplicateTripDialog.titleRequired' | translate }}
        </mat-error>
        <mat-error
          *ngIf="form.get('title').hasError('minlength') || form.get('title').hasError('maxlength')"
        >
          {{ 'myTrips.duplicateTripDialog.titleLength' | translate }}
        </mat-error>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" (click)="onCancel()">
          {{ 'myTrips.duplicateTripDialog.cancel' | translate | uppercase }}
        </button>
        <button mat-flat-button color="primary" type="submit" [disabled]="!form.valid">
          {{ 'myTrips.duplicateTripDialog.duplicate' | translate | uppercase }}
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
export class DuplicateTripDialogComponent implements OnInit {
  public form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<DuplicateTripDialogComponent>,
    private formBuilder: FormBuilder,
    private myTripsService: MyTripsService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Trip
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
    this.translate
      .get('myTrips.duplicateTripDialog.copyOf')
      .subscribe(t => this.form.get('title').setValue(`${t} ${this.data.title}`))
  }

  public async onSubmit(): Promise<void> {
    await this.myTripsService.duplicateTrip(this.data.id, this.form.value.title)
    this.dialogRef.close()
  }

  public onCancel(): void {
    this.dialogRef.close()
  }
}
