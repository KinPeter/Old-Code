import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '~/app/services/user-auth/auth.service';
import { UiService } from '~/app/services/ui.service';

@Component({
  selector: 'tp-menu-bar',
  template: `
    <aside class="menu-bar d-flex flex-column justify-content-between align-items-center">
      <div class="main-menu d-flex flex-column justify-content-start align-items-center pt-2">
        <button
          routerLink="/"
          mat-icon-button
          class="mb-1"
          matTooltip="Home"
          matTooltipPosition="right"
          matTooltipClass="menubar-tooltip"
          data-tp-test="menu-bar-home-btn"
        >
          <mat-icon>home</mat-icon>
        </button>
        <button
          *ngIf="auth.isAuth | async"
          routerLink="/mytrips"
          mat-icon-button
          class="mb-1"
          matTooltip="My Trips"
          matTooltipPosition="right"
          matTooltipClass="menubar-tooltip"
          data-tp-test="menu-bar-my-trips-btn"
        >
          <mat-icon>format_list_bulleted</mat-icon>
        </button>
        <button
          *ngIf="auth.isAuth | async"
          routerLink="/planner/new"
          mat-icon-button
          class="mb-1"
          matTooltip="New Trip"
          matTooltipPosition="right"
          matTooltipClass="menubar-tooltip"
          data-tp-test="menu-bar-new-trip-btn"
        >
          <mat-icon>room</mat-icon>
        </button>
        <button
          routerLink="/help"
          mat-icon-button
          class="mb-1"
          matTooltip="Help"
          matTooltipPosition="right"
          matTooltipClass="menubar-tooltip"
          data-tp-test="menu-bar-help-btn"
        >
          <mat-icon>help_outline</mat-icon>
        </button>
        <div class="menu-divider my-3"></div>
        <button
          *ngIf="auth.isAuth | async"
          routerLink="/profile"
          mat-icon-button
          class="mb-1"
          matTooltip="My Profile"
          matTooltipPosition="right"
          matTooltipClass="menubar-tooltip"
          data-tp-test="menu-bar-my-profile-btn"
        >
          <mat-icon>account_circle</mat-icon>
        </button>
        <button
          *ngIf="!auth.isAuth.value"
          mat-icon-button
          class="mb-1"
          matTooltip="Log in"
          matTooltipPosition="right"
          matTooltipClass="menubar-tooltip"
          data-tp-test="menu-bar-login-btn"
          (click)="ui.showLogin()"
        >
          <mat-icon>how_to_reg</mat-icon>
        </button>
        <button
          *ngIf="auth.isAuth | async"
          mat-icon-button
          class="mb-1"
          matTooltip="Log out"
          matTooltipPosition="right"
          matTooltipClass="menubar-tooltip"
          data-tp-test="menu-bar-logout-btn"
          (click)="auth.logOut()"
        >
          <mat-icon>meeting_room</mat-icon>
        </button>
      </div>
      <div class="account-menu pb-2">
        <a
          mat-icon-button
          class="mb-1"
          matTooltip="P-Kin.com"
          matTooltipPosition="right"
          matTooltipClass="menubar-tooltip"
          href="https://www.p-kin.com"
          target="_blank"
        >
          <img src="./assets/p-logo-light.svg" alt="p-logo" />
        </a>
      </div>
    </aside>
  `,
  styles: [
    `
      aside.menu-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 60px;
        height: 100vh;
        background-color: var(--color-teal);
        box-shadow: 2px 0px 3px rgba(0, 0, 0, 0.3);
      }

      aside.menu-bar button[mat-icon-button],
      aside.menu-bar a[mat-icon-button] {
        width: 50px !important;
        height: 50px !important;
        line-height: 50px !important;
        transition: transform 0.2s ease;
      }

      aside.menu-bar button[mat-icon-button] mat-icon,
      aside.menu-bar a[mat-icon-button] mat-icon {
        width: 32px !important;
        height: 32px !important;
        font-size: 32px !important;
        line-height: 32px !important;
        color: #fff;
      }

      aside.menu-bar button[mat-icon-button]:hover,
      aside.menu-bar a[mat-icon-button]:hover {
        transform: scale(0.95);
      }

      aside.menu-bar .menu-divider {
        border-bottom: 1px solid white;
        width: 30px;
        opacity: 0.5;
      }

      aside.menu-bar img {
        width: 36px;
      }

      .menubar-tooltip {
        font-size: 1rem;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuBarComponent implements OnInit {
  constructor(public ui: UiService, public auth: AuthService) {}

  ngOnInit() {}
}
