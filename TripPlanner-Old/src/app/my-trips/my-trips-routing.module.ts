import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTripsComponent } from '~/app/my-trips/my-trips.component';

const routes: Routes = [{ path: '', component: MyTripsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTripsRoutingModule {}
