import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Quote } from '~/app/types/shared.types'

@Component({
  selector: 'tp-sliding-quotes',
  template: `
    <div class="quote-wrapper" [class.big]="size === 'big'" [class.small]="size === 'small'">
      <div
        class="quote"
        *ngFor="let quote of quotes; let i = index"
        [class.come-in]="activeSlideIndex === i"
      >
        <img src="./assets/svg/quote-right-solid.svg" alt="quote-right" class="quote-svg" />
        <p class="text">{{ quote.text }}</p>
        <p class="author">&mdash; {{ quote.author }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./sliding-quotes.component.scss']
})
export class SlidingQuotesComponent implements OnInit, OnDestroy {
  @Input() public quotes: Quote[]
  @Input() public size: string
  private interval
  public activeSlideIndex: number

  constructor() {}

  ngOnInit(): void {
    this.activeSlideIndex = Math.floor(Math.random() * (this.quotes.length - 1))
    this.interval = setInterval(() => {
      if (this.activeSlideIndex < this.quotes.length - 1) {
        this.activeSlideIndex++
      } else {
        this.activeSlideIndex = 0
      }
    }, 6000)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}
