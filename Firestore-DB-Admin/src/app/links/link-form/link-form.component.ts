import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { LinksService } from '../links.service';
import { Link } from 'src/app/interfaces';


@Component({
    selector: 'app-link-form',
    templateUrl: './link-form.component.html',
    styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent implements OnInit, AfterViewInit {

    @ViewChild('form', { static: true }) form: NgForm;

    constructor(
        public ls: LinksService,
        public dialogRef: MatDialogRef<LinkFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Link
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.data) {
            setTimeout(() => {
                this.form.setValue({
                    name: this.data.name,
                    url: this.data.url,
                    tags: this.data.tags
                });
                this.form.form.markAsPristine();
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.data) {
            this.ls.updateLink(this.data.id, this.form.value);
        } else {
            this.ls.addNewLink(this.form.value);
        }
        this.dialogRef.close();
    }

}
