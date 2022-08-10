import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksComponent } from './links.component';
import { LinksRoutingModule } from './links-routing.module';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LinksService } from './links.service';
import { DeleteLinkDialogComponent } from './delete-link-dialog.component';
import { LinkFormComponent } from './link-form/link-form.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        LinksComponent,
        DeleteLinkDialogComponent,
        LinkFormComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        LinksRoutingModule,
        MaterialModule,
        AngularFirestoreModule,
        FormsModule
    ],
    providers: [LinksService],
    entryComponents: [DeleteLinkDialogComponent, LinkFormComponent]
})
export class LinksModule { }
