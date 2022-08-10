import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from '~/app/services/content/portfolio.service';
import { PortfolioItem } from '~/app/types/content/PortfolioItem';
import { UUID } from '~/app/types/UUID';
import { LoadedItem } from '~/app/types/content/LoadedItem';

@Component({
  selector: 'pk-portfolio',
  template: `
    <pk-portfolio-wrapper
      [items]="items"
      [filters]="filters"
      [currentFilter]="currentFilter"
      [loadedItem]="loadedItem"
      (applyFilter)="onApplyFilter($event)"
      (openItem)="onOpenItem($event)"
    ></pk-portfolio-wrapper>
  `,
  styles: [``],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  filters: string[] = [];
  currentFilter = '';
  items: PortfolioItem[] = [];
  loadedItem: LoadedItem = { name: '', badges: [], description: '' };

  constructor(public portfolioService: PortfolioService) {
    this.portfolioService.fetchIfNeeded();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.portfolioService.filters$.subscribe(value => {
        this.filters = value;
      }),
      this.portfolioService.currentFilter$.subscribe(value => {
        this.currentFilter = value;
      }),
      this.portfolioService.filteredItems$.subscribe(value => {
        this.items = value;
      }),
      this.portfolioService.loadedItem$.subscribe(value => {
        if (value) {
          this.loadedItem = value;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.portfolioService.resetState();
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onOpenItem(id: UUID): void {
    this.portfolioService.loadItem(id);
  }

  onApplyFilter(filter: string): void {
    this.portfolioService.applyFilter(filter);
  }
}
