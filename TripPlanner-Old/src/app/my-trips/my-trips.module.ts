import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTripsRoutingModule } from '~/app/my-trips/my-trips-routing.module';
import { MyTripsComponent } from '~/app/my-trips/my-trips.component';
import { MyTripsListComponent } from '~/app/my-trips/my-trips-list/my-trips-list.component';
import { MaterialModule } from '~/app/material.module';
import { FormsModule } from '@angular/forms';
import { CustomPipesModule } from '~/app/utils/custom-pipes.module';

@NgModule({
  declarations: [MyTripsComponent, MyTripsListComponent],
  imports: [CommonModule, MyTripsRoutingModule, MaterialModule, FormsModule, CustomPipesModule],
})
export class MyTripsModule {}
