import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UiService } from '~/app/services/ui.service';
import { AuthService } from '~/app/services/user-auth/auth.service';
import { UserService } from '~/app/services/user-auth/user.service';

@Component({
  selector: 'tp-login-modal',
  template: `
    <section class="login-modal-wrapper">
      <div class="modal-overlay" (click)="ui.hideLogin()"></div>
      <mat-card class="login-modal">
        <mat-card-title>Log in to TripPlanner</mat-card-title>
        <mat-card-subtitle>
          Use your email and password to proceed
        </mat-card-subtitle>
        <mat-card-content>
          <form class="d-flex flex-column" #f="ngForm" (submit)="onLogin(f)">
            <mat-form-field>
              <input
                matInput
                ngModel
                type="email"
                name="email"
                autocomplete="email"
                required
                email
                #emailInput="ngModel"
                placeholder="E-mail"
              />
              <mat-error *ngIf="emailInput.hasError('required')">
                Field must not be empty.
              </mat-error>
              <mat-error *ngIf="!emailInput.hasError('required')">
                Email is invalid.
              </mat-error>
            </mat-form-field>
            <mat-form-field>
              <input
                matInput
                ngModel
                type="password"
                name="password"
                autocomplete="current-password"
                required
                minlength="6"
                #pwInput="ngModel"
                placeholder="Password"
              />
              <mat-error *ngIf="pwInput.hasError('required')">
                Field must not be empty.
              </mat-error>
              <mat-error *ngIf="!pwInput.hasError('required')">
                Password must be at least 6 characters.
              </mat-error>
            </mat-form-field>
            <button type="submit" style="display: none;"></button>
          </form>
          <p>
            Forgot your password?
            <br />
            Enter your email above, and
            <a (click)="onResetPassword(f)">click here!</a>
          </p>
        </mat-card-content>
        <mat-card-actions class="d-flex justify-content-end">
          <button mat-button (click)="ui.hideLogin()">
            CANCEL
          </button>
          <button mat-button color="primary" [disabled]="f.invalid" (click)="onLogin(f)">
            LOG IN
          </button>
        </mat-card-actions>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .login-modal-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }

      .login-modal-wrapper .modal-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        animation: fadeIn 0.3s ease forwards;
      }

      mat-card.login-modal {
        position: relative;
        margin-top: 5rem;
        animation: slideIn 0.2s ease forwards;
      }

      mat-card.login-modal mat-card-content {
        width: 350px;
      }

      mat-card.login-modal mat-card-content p {
        text-align: right;
        color: var(--color-text-light);
        font-size: 0.8rem;
      }

      mat-card.login-modal mat-card-content p a {
        cursor: pointer;
        color: var(--color-teal-lighter);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-100px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class LoginModalComponent implements OnInit {
  constructor(public ui: UiService, private auth: AuthService, private userService: UserService) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (form.valid) {
      this.auth.login(form.value.email, form.value.password);
    }
  }

  onResetPassword(form: NgForm) {
    if (!!form.value.email && form.controls.email.valid) {
      this.userService.sendPasswordResetEmail(form.value.email);
      this.ui.hideLogin();
    }
  }
}
