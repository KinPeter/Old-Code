import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

import { TripsOrder } from '~/app/types/shared.types'

@Component({
  selector: 'tp-trip-filters',
  template: `
    <mat-form-field class="filter-item">
      <mat-label>{{ 'myTrips.filters.searchLabel' | translate }}</mat-label>
      <input
        type="text"
        matInput
        #searchBar
        [placeholder]="'myTrips.filters.searchPlaceholder' | translate"
      />
    </mat-form-field>
    <button mat-flat-button color="primary" class="filter-item" [matMenuTriggerFor]="orderMenu">
      {{ 'myTrips.filters.orderBy' | translate | uppercase }}
      <mat-icon matSuffix>arrow_drop_down</mat-icon>
    </button>
    <mat-checkbox
      class="filter-item"
      [(ngModel)]="isFutureOnly"
      (change)="futureOnly.emit(isFutureOnly)"
    >
      {{ 'myTrips.filters.futureOnly' | translate }}
    </mat-checkbox>

    <mat-menu #orderMenu="matMenu">
      <button *ngFor="let order of tripsOrders" mat-menu-item (click)="orderBy.emit(order)">
        {{ 'myTrips.filters.' + order | translate }}
      </button>
    </mat-menu>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1080px;
        margin: 1rem auto;
        padding: 0 0.5rem;
      }
      @media (min-width: 1080px) {
        :host {
          padding: 0;
        }
      }
      .filter-item:not(:first-child):not(:last-child) {
        margin: 0 1rem;
      }
      mat-form-field {
        flex: 1;
        width: 100%;
      }
    `
  ]
})
export class TripFiltersComponent implements AfterViewInit, OnDestroy {
  public isFutureOnly = true
  public tripsOrders: TripsOrder[] = Object.values(TripsOrder)

  private searchSub: Subscription

  @ViewChild('searchBar') public searchBar: ElementRef<HTMLInputElement>

  @Output() public orderBy: EventEmitter<TripsOrder> = new EventEmitter<TripsOrder>()
  @Output() public futureOnly: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() public search: EventEmitter<string> = new EventEmitter<string>()

  constructor() {}

  ngAfterViewInit(): void {
    this.searchSub = fromEvent(this.searchBar.nativeElement, 'keyup')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => this.search.emit(value || null))
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe()
  }
}
