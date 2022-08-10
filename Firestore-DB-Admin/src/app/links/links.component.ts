import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LinksService } from './links.service';
import { Link } from '../interfaces';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { DeleteLinkDialogComponent } from './delete-link-dialog.component';
import { LinkFormComponent } from './link-form/link-form.component';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    displayedColumns = ['name', 'url', 'tags', 'actions'];
    dataSource = new MatTableDataSource<Link>();
    linksSub: Subscription;

    constructor(
        public ls: LinksService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.ls.links.subscribe((links) => {
            this.dataSource.data = links;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    fetchLinks(tag: string) {
        this.ls.fetchLinks(tag);
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onEdit(element: Link) {
        this.dialog.open(LinkFormComponent, {
            width: '500px',
            data: element
        });
    }

    onDelete(element: Link) {
        this.dialog.open(DeleteLinkDialogComponent, { data: element });
    }

    onAddNew() {
        this.dialog.open(LinkFormComponent, {
            width: '500px',
            data: null
        });
    }

    ngOnDestroy() {
        if (this.linksSub) {
            this.linksSub.unsubscribe();
        }
    }
}
