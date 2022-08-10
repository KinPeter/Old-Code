import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, CollectionReference } from '@angular/fire/firestore';
import { Link, Tag } from '../interfaces';
import { Subject } from 'rxjs';
import { SpinnerService } from '../spinner.service';
import { SnackbarService } from '../snackbar.service';
import { tagList } from './link-tags';

@Injectable()
export class LinksService {

    public tags: Tag[] = tagList;
    private lastFetchedTag: string;
    public linksCollection = this.db.collection<Link>('links');
    public links = new Subject<Link[]>();

    constructor(
        private db: AngularFirestore,
        private spinner: SpinnerService,
        private snackbar: SnackbarService
    ) { }

    fetchLinks(tag: string): void {
        this.spinner.show();
        this.lastFetchedTag = tag;
        const query = (ref: CollectionReference) => ref.where('tags', 'array-contains', tag).orderBy('name', 'asc');
        this.db.collection('links', query).get().subscribe((snapshot: QuerySnapshot<any>) => {
            const fetchedLinks: Link[] = [];
            let link: Link;
            let data: any;
            snapshot.docs.forEach((doc) => {
                data = doc.data();
                link = {
                    id: doc.id,
                    name: data.name,
                    url: data.url,
                    tags: data.tags
                };
                fetchedLinks.push(link);
            });
            this.links.next(fetchedLinks);
            this.spinner.hide();
        }, (error: any) => {
            this.links.error(new Error(error));
            this.snackbar.error(error.message);
            this.spinner.hide();
        });
    }

    async updateLink(id: string, link: Link) {
        this.spinner.show();
        try {
            await this.linksCollection.doc(id).set(link);
            this.snackbar.show('Link updated successfully.');
            this.fetchLinks(this.lastFetchedTag);
        } catch (error) {
            console.log(error);
            this.snackbar.error(error.message);
        } finally {
            this.spinner.hide();
        }
    }

    async addNewLink(link: Link) {
        this.spinner.show();
        try {
            await this.linksCollection.add(link);
            this.snackbar.show('Link added successfully.');
            this.fetchLinks(this.lastFetchedTag);
        } catch (error) {
            console.log(error);
            this.snackbar.error(error.message);
        } finally {
            this.spinner.hide();
        }
    }

    async deleteLink(id: string) {
        this.spinner.show();
        try {
            await this.linksCollection.doc(id).delete();
            this.snackbar.show('Link deleted.');
            this.fetchLinks(this.lastFetchedTag);
        } catch (error) {
            console.log(error);
            this.snackbar.error(error.message);
        } finally {
            this.spinner.hide();
        }
    }
}
