import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'tp-loading-indicator',
  template: `
    <mat-progress-spinner
      color="accent"
      mode="indeterminate"
      diameter="40"
      strokeWidth="4"
    ></mat-progress-spinner>
  `,
  styles: [
    `
      :host {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-white-40);
      }
    `
  ]
})
export class LoadingIndicatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
