import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AutocompleteService {
    public wordlist: string[];
    public options = new Subject<string[]>();
    public searchTerm = new Subject<string>();
    public clearField = new Subject<void>();
    public selectedIndex = new BehaviorSubject<number>(-1);
    public lastKeypress = new Subject<string>();

    setWordList(inputList: string[]) {
        this.wordlist = inputList;
    }

    getOptions(input: string) {
        if (input.length > 1) {
            const newOptions = this.wordlist.filter(
                (word: string) => word.includes(input)
            );
            this.options.next(newOptions);
        } else {
            this.options.next(null);
        }
    }



}
