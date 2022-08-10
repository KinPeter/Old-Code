import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, CollectionReference } from '@angular/fire/firestore';
import { Tile } from '../interfaces';
import { Subject } from 'rxjs';
import { SpinnerService } from '../spinner.service';
import { SnackbarService } from '../snackbar.service';

@Injectable()
export class TilesService {

    public categories = ['top', 'coding', 'google', 'fun', 'others'];
    public tilesCollection = this.db.collection<Tile>('tiles');
    public tiles = new Subject<Tile[]>();

    constructor(
        private db: AngularFirestore,
        private spinner: SpinnerService,
        private snackbar: SnackbarService
    ) { }

    fetchTiles(category: string): void {
        this.spinner.show();
        const query = (ref: CollectionReference) => ref.where('category', '==', category).orderBy('priority', 'asc');
        this.db.collection('tiles', query).get().subscribe((snapshot: QuerySnapshot<any>) => {
            const fetchedTiles: Tile[] = [];
            let tile: Tile;
            let data: any;
            snapshot.docs.forEach((doc) => {
                data = doc.data();
                tile = {
                    id: doc.id,
                    name: data.name,
                    category: data.category,
                    link: data.link,
                    icon: data.icon,
                    priority: data.priority
                };
                fetchedTiles.push(tile);
            });
            this.tiles.next(fetchedTiles);
            this.spinner.hide();
        }, (error: any) => {
            this.tiles.error(new Error(error));
            this.snackbar.error(error.message);
            this.spinner.hide();
        });
    }

    async updateTile(id: string, tile: Tile) {
        this.spinner.show();
        try {
            await this.tilesCollection.doc(id).set(tile);
            this.snackbar.show('Tile updated successfully.');
            this.fetchTiles(tile.category);
        } catch (error) {
            console.log(error);
            this.snackbar.error(error.message);
        } finally {
            this.spinner.hide();
        }

    }

    async addNewTile(tile: Tile) {
        this.spinner.show();
        try {
            await this.tilesCollection.add(tile);
            this.snackbar.show('Tile added successfully.');
            this.fetchTiles(tile.category);
        } catch (error) {
            console.log(error);
            this.snackbar.error(error.message);
        } finally {
            this.spinner.hide();
        }
    }

    async deleteTile(id: string, category: string) {
        this.spinner.show();
        try {
            await this.tilesCollection.doc(id).delete();
            this.snackbar.show('Tile deleted.');
            this.fetchTiles(category);
        } catch (error) {
            console.log(error);
            this.snackbar.error(error.message);
        } finally {
            this.spinner.hide();
        }
    }
}
