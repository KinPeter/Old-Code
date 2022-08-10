import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tile } from 'src/app/interfaces';
import { TilesService } from '../tiles.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-tile-form',
    templateUrl: './tile-form.component.html',
    styleUrls: ['./tile-form.component.scss']
})
export class TileFormComponent implements OnInit, AfterViewInit {

    @ViewChild('form', {static: true}) form: NgForm;

    constructor(
        public ts: TilesService,
        public dialogRef: MatDialogRef<TileFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Tile
    ) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.data) {
            this.ts.updateTile(this.data.id, this.form.value);
        } else {
            this.ts.addNewTile(this.form.value);
        }
        this.dialogRef.close();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.data) {
            setTimeout(() => {
                this.form.setValue({
                    category: this.data.category,
                    name: this.data.name,
                    link: this.data.link,
                    icon: this.data.icon,
                    priority: this.data.priority
                });
                this.form.form.markAsPristine();
            });
        }
    }
}
