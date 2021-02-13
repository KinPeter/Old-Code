import { Component } from '@angular/core';
import { UiService } from '~/app/services/ui.service';
import { AuthService } from '~/app/services/user-auth/auth.service';

@Component({
  selector: 'tp-root',
  template: `
    <tp-menu-bar></tp-menu-bar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <mat-progress-bar
      mode="indeterminate"
      *ngIf="ui.isLoading | async"
      color="accent"
    ></mat-progress-bar>
    <tp-login-modal *ngIf="ui.loginShown | async"></tp-login-modal>
  `,
  styles: [
    `
      mat-progress-bar {
        position: fixed;
        top: 0;
        left: 60px;
        width: calc(100vw - 60px);
        height: 5px;
      }

      mat-progress-bar:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 5px;
        box-shadow: inset 2px 0 3px rgba(0, 0, 0, 0.3);
      }

      main {
        margin-left: 60px;
      }
    `,
  ],
})
export class AppComponent {
  constructor(public ui: UiService, public auth: AuthService) {
    this.auth.autoLogin();
  }
}
