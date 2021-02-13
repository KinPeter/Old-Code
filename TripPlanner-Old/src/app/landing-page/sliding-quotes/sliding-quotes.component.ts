import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Quote } from '~/app/types/shared.types';

@Component({
  selector: 'tp-sliding-quotes',
  template: `
    <div class="quote-wrapper" [class.big]="size === 'big'" [class.small]="size === 'small'">
      <article *ngFor="let quote of quotes; let i = index" [class.come-in]="activeSlideIndex === i">
        <img src="./assets/quote-right-solid.svg" alt="quote-right" class="quote-svg" />
        <p class="text">{{ quote.text }}</p>
        <p class="author">&mdash; {{ quote.author }}</p>
      </article>
    </div>
  `,
  styleUrls: ['./sliding-quotes.component.scss'],
})
export class SlidingQuotesComponent implements OnInit, OnDestroy {
  @Input() quotes: Quote[];
  @Input() size: string;
  private interval: any;
  public activeSlideIndex = 0;

  constructor() {}

  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.activeSlideIndex < this.quotes.length - 1) {
        this.activeSlideIndex++;
      } else {
        this.activeSlideIndex = 0;
      }
    }, 8000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
