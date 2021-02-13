import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router, RouterEvent } from '@angular/router'
import { Observable } from 'rxjs'
import { filter, map, startWith } from 'rxjs/operators'

@Component({
  selector: 'tp-app-bar',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z5">
      <a
        class="app-bar__logo-small"
        [class.app-bar__logo-small_hidden]="isAuthPage | async"
        routerLink="/my-trips"
      >
        <img src="/assets/svg/tripplanner-logo.svg" alt="Logo" />
      </a>
      <div class="app-bar-spacer"></div>
      <button mat-icon-button>
        <mat-icon>help_outline</mat-icon>
      </button>
      <tp-language-changer></tp-language-changer>
      <tp-account-menu *ngIf="!(isAuthPage | async)"></tp-account-menu>
    </mat-toolbar>
  `,
  styles: [
    `
      .app-bar__logo-small,
      .app-bar__logo-small img {
        height: 36px;
      }
      .app-bar-spacer {
        flex: 1;
      }

      @media (min-width: 1000px) {
        .app-bar__logo-small_hidden {
          display: none;
        }
      }
    `
  ]
})
export class AppBarComponent implements OnInit {
  public isAuthPage: Observable<boolean>

  constructor(private router: Router) {
    this.isAuthPage = this.router.events.pipe(
      filter((e: RouterEvent) => e instanceof NavigationEnd),
      map(
        (e: NavigationEnd) =>
          e.urlAfterRedirects.startsWith('/auth') && !e.urlAfterRedirects.includes('reset-password')
      ),
      startWith(true)
    )
  }

  ngOnInit(): void {}
}
