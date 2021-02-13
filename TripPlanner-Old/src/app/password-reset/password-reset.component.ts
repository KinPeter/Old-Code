import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '~/app/services/user-auth/user.service';

@Component({
  selector: 'tp-password-reset',
  template: `
    <mat-card>
      <section class="change-password">
        <h3>Reset your password for TripPlanner</h3>
        <mat-hint>Please choose a strong password!</mat-hint>
        <mat-form-field appearance="outline">
          <mat-label>New password</mat-label>
          <input
            matInput
            [(ngModel)]="newPassword"
            (change)="validatePasswords()"
            type="password"
            minlength="6"
            #passwordInput="ngModel"
            placeholder="Your password"
            autocomplete="new-password"
          />
          <mat-error *ngIf="passwordInput.hasError('minlength')">
            Must be at least 6 characters and contain capital letters and numbers.
          </mat-error>
        </mat-form-field>
        <mat-form-field
          appearance="outline"
          [class.ng-invalid]="passwordsDoNotMatch"
          [class.mat-form-field-invalid]="passwordsDoNotMatch"
          [class.ng-valid]="!passwordsDoNotMatch"
        >
          <mat-label>Confirm password</mat-label>
          <input
            matInput
            [(ngModel)]="newPasswordConf"
            (change)="validatePasswords()"
            [class.ng-invalid]="passwordsDoNotMatch"
            [class.ng-valid]="!passwordsDoNotMatch"
            type="password"
            minlength="6"
            #passConfInput="ngModel"
            placeholder="Please type it again"
            autocomplete="new-password"
          />
        </mat-form-field>
        <mat-error class="do-not-match" *ngIf="passwordsDoNotMatch">
          Passwords do not match!
        </mat-error>
        <div class="d-flex justify-content-center">
          <button
            mat-raised-button
            color="primary"
            [disabled]="
              !newPassword ||
              !newPasswordConf ||
              newPassword.trim().length < 6 ||
              passwordsDoNotMatch
            "
            (click)="onResetPassword()"
          >
            SAVE NEW PASSWORD
          </button>
        </div>
      </section>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        width: 400px;
        margin: 3rem auto;
      }

      mat-card section.change-password {
        width: 100%;
      }

      mat-card section.change-password mat-hint {
        font-size: 75%;
        display: block;
        margin-bottom: 1rem;
      }

      mat-card section.change-password mat-form-field {
        display: block;
      }

      mat-card section.change-password mat-error.do-not-match {
        font-size: 75%;
        margin-top: -1rem;
        padding-left: 0.5rem;
      }
    `,
  ],
})
export class PasswordResetComponent implements OnInit {
  public email: string;
  public resetToken: string;
  public newPassword: string;
  public newPasswordConf: string;
  public passwordsDoNotMatch = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = params.email;
      this.resetToken = params.resetToken;
    });
  }

  validatePasswords(): void {
    this.passwordsDoNotMatch = this.newPassword !== this.newPasswordConf;
  }

  onResetPassword(): void {
    this.userService.resetPassword({
      email: this.email,
      resetToken: this.resetToken,
      newPassword: this.newPassword,
    });
    this.router.navigate(['/']);
  }
}
