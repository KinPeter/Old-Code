import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TilesComponent } from './tiles.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { TilesRoutingModule } from './tiles-routing.module';
import { TilesService } from './tiles.service';
import { TileFormComponent } from './tile-form/tile-form.component';
import { FormsModule } from '@angular/forms';
import { DeleteTileDialogComponent } from './delete-tile-dialog.component';


@NgModule({
    declarations: [
        TilesComponent,
        TileFormComponent,
        DeleteTileDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        TilesRoutingModule,
        MaterialModule,
        AngularFirestoreModule
    ],
    providers: [TilesService],
    entryComponents: [TileFormComponent, DeleteTileDialogComponent]
})
export class TilesModule { }
