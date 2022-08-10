import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TilesService } from './tiles.service';
import { Tile } from '../interfaces';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { TileFormComponent } from './tile-form/tile-form.component';
import { DeleteTileDialogComponent } from './delete-tile-dialog.component';

@Component({
    selector: 'app-tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    displayedColumns = ['category', 'name', 'link', 'icon', 'priority', 'actions'];
    dataSource = new MatTableDataSource<Tile>();
    tilesSub: Subscription;

    constructor(
        public ts: TilesService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.ts.tiles.subscribe((tiles) => {
            this.dataSource.data = tiles;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    fetchTiles(category: string) {
        this.ts.fetchTiles(category);
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onEdit(element: Tile) {
        this.dialog.open(TileFormComponent, {
            width: '500px',
            data: element
        });
    }

    onDelete(element: Tile) {
        this.dialog.open(DeleteTileDialogComponent, {data: element});
    }

    onAddNew() {
        this.dialog.open(TileFormComponent, {
            width: '500px',
            data: null
        });
    }

    ngOnDestroy() {
        if (this.tilesSub) {
            this.tilesSub.unsubscribe();
        }
    }

}
