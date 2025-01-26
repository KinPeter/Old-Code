import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'tp-no-trips-found',
  template: `
    <mat-icon>location_off</mat-icon>
    <p>{{ 'myTrips.noTripsFound' | translate }}</p>
  `,
  styles: [
    `
      :host {
        color: var(--color-text-lightest);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 3rem 1rem;
      }
      mat-icon {
        font-size: 3rem;
        margin-bottom: 2rem;
      }
      p {
        text-align: center;
      }
    `
  ]
})
export class NoTripsFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
