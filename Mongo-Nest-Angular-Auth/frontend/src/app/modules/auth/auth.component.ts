import { Component } from '@angular/core'

@Component({
  selector: 'tp-auth',
  template: `
    <tp-auth-header></tp-auth-header>
    <div class="auth-page">
      <mat-tab-group color="accent" [(selectedIndex)]="tabIndex">
        <mat-tab [label]="'auth.login' | translate">
          <ng-template matTabContent>
            <tp-login [emailJustSignedUp]="emailJustSignedUp"></tp-login>
          </ng-template>
        </mat-tab>
        <mat-tab [label]="'auth.signup' | translate">
          <ng-template matTabContent>
            <tp-signup (success)="onSignupSuccess($event)"></tp-signup>
          </ng-template>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [
    `
      .auth-page {
        color: white;
        display: flex;
        justify-content: center;
        height: calc(100vh - 56px);
        background-color: var(--color-primary);
      }
      mat-tab-group {
        width: 320px;
        max-width: 100%;
      }
      tp-auth-header {
        display: none;
      }
      @media (min-width: 1000px) {
        tp-auth-header {
          display: block;
        }
        .auth-page {
          height: calc(100vh - 306px);
        }
      }
    `
  ]
})
export class AuthComponent {
  public loginLabel: string
  public signupLabel: string
  public tabIndex = 0
  public emailJustSignedUp: string

  constructor() {}

  public onSignupSuccess(email: string): void {
    this.tabIndex = 0
    this.emailJustSignedUp = email
  }
}
