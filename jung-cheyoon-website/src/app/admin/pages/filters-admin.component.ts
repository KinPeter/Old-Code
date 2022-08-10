import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminPortfolioService } from '../services/admin-portfolio.service';

@Component({
  selector: 'pk-admin-filters',
  template: `
    <div class="filters-admin">
      <header>
        <h1>Filters</h1>
        <button class="pk-button pk-button_accent" (click)="onSave()">Save</button>
      </header>

      <section class="filters">
        <ul>
          <li *ngFor="let filter of filters; let i = index; trackBy: trackByFn">
            <input class="pk-input" type="text" [(ngModel)]="filters[i]" />
            <button class="pk-small-icon-button" [disabled]="!canMoveUp(i)" (click)="onMoveUp(i)">
              <pk-icon-arrow [size]="24" direction="up"></pk-icon-arrow>
            </button>
            <button
              class="pk-small-icon-button"
              [disabled]="!canMoveDown(i)"
              (click)="onMoveDown(i)"
            >
              <pk-icon-arrow [size]="24" direction="down"></pk-icon-arrow>
            </button>
            <div class="pk-small-icon-button" (click)="onDeleteFilter(i)">
              <pk-icon-trash></pk-icon-trash>
            </div>
          </li>
        </ul>
        <button class="pk-button" (click)="onAddFilter()">+ Add new filter</button>
      </section>

      <hr />

      <button class="pk-button pk-button_accent" (click)="onSave()">Save</button>
    </div>
  `,
  styles: [
    `
      .filters-admin {
        padding-bottom: 2rem;
      }

      .filters ul {
        padding: 0;
      }

      .filters li {
        display: flex;
        align-items: center;
        list-style-type: none;
        margin-bottom: 0.5rem;
      }

      .filters li .pk-input {
        margin-right: 1rem;
      }

      header {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class FiltersAdminComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public filters: string[] = [];

  constructor(private adminPortfolioService: AdminPortfolioService) {
    this.adminPortfolioService.fetch();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.adminPortfolioService.content$.subscribe(content => {
        this.filters = content.filters;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onSave(): void {
    this.adminPortfolioService.saveFilters(this.filters);
  }

  onDeleteFilter(index: number): void {
    this.filters.splice(index, 1);
  }

  onAddFilter(): void {
    this.filters.push('new filter');
  }

  onMoveUp(index: number): void {
    const item = this.filters.splice(index, 1);
    this.filters.splice(index - 1, 0, item[0]);
  }

  onMoveDown(index: number): void {
    const item = this.filters.splice(index, 1);
    this.filters.splice(index + 1, 0, item[0]);
  }

  canMoveUp(index: number): boolean {
    return index !== 0;
  }

  canMoveDown(index: number): boolean {
    return index !== this.filters.length - 1;
  }

  trackByFn(index: number): number {
    return index;
  }
}
