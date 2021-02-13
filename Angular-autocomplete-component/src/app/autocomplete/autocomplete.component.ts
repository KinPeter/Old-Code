import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AutocompleteService } from './autocomplete.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnDestroy {
    private searchSubscription: Subscription;
    @Input() wordlist: string[];
    @Output() hasSearchTerm = new EventEmitter<string>();

    constructor( public svc: AutocompleteService ) { }

    ngOnInit() {
        this.svc.setWordList(this.wordlist);
        this.searchSubscription = this.svc.searchTerm.subscribe((result) => {
            this.hasSearchTerm.emit(result);
            this.svc.clearField.next();
        });
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }
}
