import { Component, OnInit } from '@angular/core';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

    public searchedSitters: SearchedSitter[];
    public searchPending: boolean;

    constructor() { }

    ngOnInit() {
    }

    eventSearchedData(event: SearchedSitter[]){
        this.searchedSitters = event;
    }

    eventSearchPending(event: boolean){
        this.searchPending = event;
    }

}
