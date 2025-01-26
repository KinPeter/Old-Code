import { Injectable } from '@angular/core'
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog'

import { BaseDialogFactory } from '~/app/services/core/base-dialog.factory'
import { Trip } from '~/app/types/trip.types'
import { EditTripDialogComponent } from '~/app/modules/trips/edit-trip-dialog/edit-trip-dialog.component'
import { DuplicateTripDialogComponent } from '~/app/modules/trips/duplicate-trip-dialog/duplicate-trip-dialog.component'

@Injectable()
export class TripsDialogFactory {
  constructor(private baseDialogFactory: BaseDialogFactory) {}

  public openNewTripDialog(): MatDialogRef<EditTripDialogComponent, unknown> {
    return this.baseDialogFactory.open<EditTripDialogComponent, MatDialogConfig, unknown>(
      EditTripDialogComponent,
      {
        disableClose: false,
        width: '500px',
        maxWidth: '100%'
      }
    )
  }

  public openEditTripDialog(trip: Trip): MatDialogRef<EditTripDialogComponent, unknown> {
    return this.baseDialogFactory.open<EditTripDialogComponent, Trip, unknown>(
      EditTripDialogComponent,
      {
        data: trip,
        disableClose: false,
        width: '500px',
        maxWidth: '100%'
      }
    )
  }

  public openDuplicateTripDialog(trip: Trip): MatDialogRef<DuplicateTripDialogComponent, unknown> {
    return this.baseDialogFactory.open<DuplicateTripDialogComponent, Trip, unknown>(
      DuplicateTripDialogComponent,
      {
        data: trip,
        disableClose: false,
        width: '500px',
        maxWidth: '100%'
      }
    )
  }
}
