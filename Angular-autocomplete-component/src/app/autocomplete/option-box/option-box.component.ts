import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AutocompleteService } from '../autocomplete.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-option-box',
    templateUrl: './option-box.component.html',
    styleUrls: ['./option-box.component.scss']
})
export class OptionBoxComponent implements OnInit, AfterViewInit, OnDestroy {
    private optionsSubscription: Subscription;
    private indexSubscription: Subscription;
    private keypressSubscription: Subscription;
    public options: string[];
    public selectedIndex: number;
    private keypress: string;

    @ViewChild('list', {static: false}) listRef: ElementRef;
    @ViewChild('listItem', {static: false}) listItemRef: ElementRef;
    @HostListener('document:click', ['$event']) clickOutside = (event: MouseEvent) => { };

    constructor( private svc: AutocompleteService ) { }

    ngOnInit() {
        this.optionsSubscription = this.svc.options.subscribe((options) => {
            this.options = options;
        });
        this.keypressSubscription = this.svc.lastKeypress.subscribe((keypress) => {
            this.keypress = keypress;
        });
        setTimeout(() => {
            this.clickOutside = this.onClickOutside;
        }, 500);
    }

    ngAfterViewInit() {
        let height: number;
        this.indexSubscription = this.svc.selectedIndex.subscribe((index) => {
            this.selectedIndex = index;
            if (!!this.options) {
                height = !!height ? height : this.listItemRef.nativeElement.offsetHeight;
                if (this.keypress === 'DOWN' && index > 7) {
                    this.listRef.nativeElement.scrollTop += height;
                } else if (this.keypress === 'UP' && index > 1) {
                    this.listRef.nativeElement.scrollTop -= height;
                }
            }
        });
    }

    onOptionClick(term: string) {
        this.svc.searchTerm.next(term);
        this.svc.options.next(null);
    }

    onClickOutside(event: MouseEvent): void {
        if (!!this.options && !this.listRef.nativeElement.contains(event.target)) {
            this.svc.options.next(null);
            this.svc.selectedIndex.next(-1);
        }
    }

    ngOnDestroy() {
        this.optionsSubscription.unsubscribe();
        this.indexSubscription.unsubscribe();
        this.keypressSubscription.unsubscribe();
    }
}
