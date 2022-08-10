import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Link } from '../interfaces';
import { LinksService } from './links.service';

@Component({
    selector: 'app-delete-link-dialog',
    template: `
    <div mat-dialog-content>
        <p>Delete {{ data.name }}?</p>
    </div>
    <div mat-dialog-actions>
        <button mat-stroked-button (click)="onCancel()">Cancel</button>
        <button mat-flat-button color="warn" (click)="onConfirm()">Ok</button>
    </div>
    `,
})
export class DeleteLinkDialogComponent {

    constructor(
        private ls: LinksService,
        public dialogRef: MatDialogRef<DeleteLinkDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Link) { }

    onCancel(): void {
        this.dialogRef.close();
    }
    onConfirm(): void {
        this.ls.deleteLink(this.data.id);
        this.dialogRef.close();
    }

}
