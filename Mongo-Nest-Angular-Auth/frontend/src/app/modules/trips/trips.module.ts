import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SharedModule } from '~/app/modules/common/shared.module'
import { TripsComponent } from './trips.component'
import { TripFiltersComponent } from '~/app/modules/trips/trip-filters/trip-filters.component'
import { TripGridComponent } from '~/app/modules/trips/trip-grid/trip-grid.component'
import { TripCardComponent } from '~/app/modules/trips/trip-card/trip-card.component'
import { NoTripsFoundComponent } from '~/app/modules/trips/no-trips-found/no-trips-found.component'
import { EditTripDialogComponent } from '~/app/modules/trips/edit-trip-dialog/edit-trip-dialog.component'
import { TripsDialogFactory } from '~/app/modules/trips/trips-dialog.factory'
import { TripImageUploaderComponent } from '~/app/modules/trips/trip-image-uploader/trip-image-uploader.component'
import { DuplicateTripDialogComponent } from '~/app/modules/trips/duplicate-trip-dialog/duplicate-trip-dialog.component'

const routes: Routes = [{ path: '', component: TripsComponent }]

@NgModule({
  declarations: [
    TripsComponent,
    TripFiltersComponent,
    TripGridComponent,
    TripCardComponent,
    NoTripsFoundComponent,
    EditTripDialogComponent,
    TripImageUploaderComponent,
    DuplicateTripDialogComponent
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
  providers: [TripsDialogFactory]
})
export class TripsModule {}
