import { Component, OnInit } from '@angular/core'
import { Quote } from '~/app/types/shared.types'
import { headerQuotes } from '~/app/utils/travel-quotes'

@Component({
  selector: 'tp-auth-header',
  template: `
    <div class="auth-header">
      <img src="./assets/svg/curvypath.svg" alt="curvypath" id="curvypath" />
      <tp-sliding-quotes [quotes]="headerQuotes" size="big"></tp-sliding-quotes>
      <img src="./assets/svg/tripplanner-logo.svg" alt="tripplanner-logo" id="logo" />
    </div>
  `,
  styles: [
    `
      .auth-header {
        width: 100%;
        background-color: var(--color-primary);
        overflow: hidden;
        position: relative;
      }
      .auth-header {
        height: 250px;
      }
      .auth-header img {
        position: absolute;
      }
      .auth-header img#curvypath {
        right: 0;
        top: -45px;
        opacity: 0.45;
      }
      .auth-header img#logo {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 150px;
      }
      @media (min-width: 1025px) {
        .auth-header img#logo {
          width: 230px;
        }
      }
    `
  ]
})
export class AuthHeaderComponent implements OnInit {
  public headerQuotes: Quote[]

  constructor() {
    this.headerQuotes = headerQuotes
  }

  ngOnInit(): void {}
}
