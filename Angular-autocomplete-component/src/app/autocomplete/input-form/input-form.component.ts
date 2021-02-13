import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import {
    debounceTime,
    map,
    distinctUntilChanged,
    startWith,
    filter
} from 'rxjs/operators';
import { AutocompleteService } from '../autocomplete.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-input-form',
    templateUrl: './input-form.component.html',
    styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit, AfterViewInit, OnDestroy {

    private inputSubscription: Subscription;
    private clearSubscription: Subscription;
    private optionsSubscription: Subscription;
    @ViewChild('inputField', {static: false}) input: ElementRef;
    @ViewChild('f', {static: false}) form: NgForm;
    private options: string[];

    constructor( private svc: AutocompleteService ) { }

    ngOnInit() {
        this.optionsSubscription = this.svc.options.subscribe((options) => {
            this.options = options;
        });
    }

    ngAfterViewInit() {
        this.inputSubscription = fromEvent(this.input.nativeElement, 'keyup').pipe(
            map((event: any) => {
                if (event.key === 'Escape') {
                    this.onEscape();
                    return null;
                } else if (event.key === 'ArrowDown') {
                    this.onDownKey();
                    return null;
                } else if (event.key === 'ArrowUp') {
                    this.onUpKey();
                    return null;
                }
                return event.target.value;
            }),
            filter(value => !!value),
            startWith(''),
            debounceTime(500),
            distinctUntilChanged(),
        ).subscribe((value: string) => {
            this.svc.getOptions(value);
        });

        this.clearSubscription = this.svc.clearField.subscribe((emit) => {
            this.form.setValue({ searchTerm: '' });
        });
    }

    onEscape() {
        this.svc.options.next(null);
        this.svc.selectedIndex.next(-1);
    }

    onDownKey() {
        if (this.svc.selectedIndex.value < this.options.length - 1) {
            this.svc.lastKeypress.next('DOWN');
            this.svc.selectedIndex.next( this.svc.selectedIndex.value + 1 );
            this.form.setValue({ searchTerm: this.options[this.svc.selectedIndex.value]});
        }
    }

    onUpKey() {
        if (this.svc.selectedIndex.value > 0) {
            this.svc.lastKeypress.next('UP');
            this.svc.selectedIndex.next( this.svc.selectedIndex.value - 1 );
            this.form.setValue({ searchTerm: this.options[this.svc.selectedIndex.value]});
        }
    }

    onSubmit(form: NgForm) {
        this.svc.searchTerm.next(form.value.searchTerm);
        this.svc.options.next(null);
        this.svc.selectedIndex.next(-1);
    }

    ngOnDestroy() {
        this.inputSubscription.unsubscribe();
        this.clearSubscription.unsubscribe();
        this.optionsSubscription.unsubscribe();
    }

}
