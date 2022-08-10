import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TilesService } from './tiles.service';
import { Tile } from '../interfaces';

@Component({
    selector: 'app-delete-tile-dialog',
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
export class DeleteTileDialogComponent {

    constructor(
        private ts: TilesService,
        public dialogRef: MatDialogRef<DeleteTileDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Tile) { }

    onCancel(): void {
        this.dialogRef.close();
    }
    onConfirm(): void {
        this.ts.deleteTile(this.data.id, this.data.category);
        this.dialogRef.close();
    }

}
