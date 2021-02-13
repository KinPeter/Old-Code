import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '~/app/material.module';
import { PlannerRoutingModule } from '~/app/planner/planner-routing.module';
import { PlannerComponent } from '~/app/planner/planner.component';
import { TripHeaderComponent } from '~/app/planner/editor/trip-header/trip-header.component';
import { EditorComponent } from '~/app/planner/editor/editor.component';
import { EditorToolbarComponent } from '~/app/planner/editor/toolbar/editor-toolbar.component';
import { MapComponent } from '~/app/planner/map/map.component';
import { TripChangeCheckDirective } from '~/app/utils/trip-change-check.directive';

@NgModule({
  declarations: [
    PlannerComponent,
    EditorComponent,
    EditorToolbarComponent,
    MapComponent,
    TripHeaderComponent,
    TripChangeCheckDirective,
  ],
  imports: [CommonModule, FormsModule, PlannerRoutingModule, MaterialModule],
})
export class PlannerModule {}
