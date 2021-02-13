import { Component } from '@angular/core';
import { dummyWordList } from '../assets/word-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  wordlist = dummyWordList;
  result: string = null;

  onHasSearchTerm(term) {
    this.result = term;
  }
}
