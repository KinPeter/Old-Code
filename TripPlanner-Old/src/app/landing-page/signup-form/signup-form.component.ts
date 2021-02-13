import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UiService } from '~/app/services/ui.service';
import { UserService } from '~/app/services/user-auth/user.service';

@Component({
  selector: 'tp-signup-form',
  template: `
    <div class="signup-wrapper">
      <h3 class="mt-0">Sign up now to start using TripPlanner!</h3>
      <form class="d-flex flex-column" #f="ngForm" (ngSubmit)="onSignup()">
        <mat-form-field appearance="outline">
          <mat-label>Display name</mat-label>
          <input
            matInput
            ngModel
            type="text"
            name="name"
            autocomplete="name"
            required
            minlength="3"
            maxlength="20"
            #nameInput="ngModel"
            placeholder="Your name"
          />
          <mat-error *ngIf="nameInput.hasError('required')">
            Field must not be empty.
          </mat-error>
          <mat-error *ngIf="!nameInput.hasError('required')">
            Display name must be between 3 and 20 characters
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>E-mail</mat-label>
          <input
            matInput
            ngModel
            type="email"
            name="email"
            autocomplete="email"
            required
            email
            #emailInput="ngModel"
            placeholder="Your e-mail address"
          />
          <mat-error *ngIf="emailInput.hasError('required')">
            Field must not be empty.
          </mat-error>
          <mat-error *ngIf="!emailInput.hasError('required')">
            Email is invalid.
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input
            matInput
            ngModel
            type="password"
            name="password"
            autocomplete="new-password"
            required
            #pwInput="ngModel"
            (blur)="checkPasswordStrength()"
            placeholder="Please choose a strong one"
          />
          <mat-error *ngIf="pwInput.hasError('required')">
            Field must not be empty.
          </mat-error>
          <mat-error *ngIf="pwInput.hasError('weakPassword')">
            Must be at least 6 characters and contain capital letters and numbers.
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Confirm password</mat-label>
          <input
            matInput
            ngModel
            type="password"
            name="passwordConfirm"
            autocomplete="new-password"
            required
            #pw2Input="ngModel"
            placeholder="Please type your password again"
            (blur)="checkPasswordsMatch()"
          />
          <mat-error *ngIf="pw2Input.hasError('required')">
            Field must not be empty.
          </mat-error>
          <mat-error *ngIf="pw2Input.hasError('passwordsDontMatch')">
            The passwords do not match!
          </mat-error>
        </mat-form-field>
        <button type="submit" mat-flat-button color="accent" class="mt-2">
          SIGN UP
        </button>
      </form>
      <p>
        Already have an account?
        <a (click)="onLogin()">Log in!</a>
      </p>
    </div>
  `,
  styles: [
    `
      .signup-wrapper {
        max-width: 400px;
        padding: 2rem;
        border: 4px solid var(--color-teal-darker);
        border-radius: 1rem;
        margin: 1rem auto;
      }
      .signup-wrapper p {
        color: var(--color-text-light);
        font-size: 0.9rem;
        margin-top: 1rem;
        margin-bottom: 0;
      }
      .signup-wrapper p a {
        cursor: pointer;
        color: var(--color-deep-orange);
      }
    `,
  ],
})
export class SignupFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  private passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  constructor(private ui: UiService, private userService: UserService) {}

  ngOnInit() {}

  onSignup() {
    if (this.form.valid) {
      const data = this.form.value;
      this.userService.signUp(data.email, data.password, data.name);
    }
  }

  onLogin() {
    this.ui.showLogin();
  }

  checkPasswordStrength() {
    if (!this.passwordRegex.test(this.form.value.password) || this.form.value.password.length < 6) {
      if (this.form.controls.password.hasError('required')) {
        this.form.controls.password.setErrors({
          required: true,
          weakPassword: true,
        });
      } else {
        this.form.controls.password.setErrors({ weakPassword: true });
      }
    } else {
      if (this.form.controls.password.hasError('required')) {
        this.form.controls.password.setErrors({ required: true });
      } else {
        this.form.controls.password.setErrors(null);
      }
    }
  }

  checkPasswordsMatch() {
    if (this.form.value.password !== this.form.value.passwordConfirm) {
      if (this.form.controls.passwordConfirm.hasError('required')) {
        this.form.controls.passwordConfirm.setErrors({
          required: true,
          passwordsDontMatch: true,
        });
      } else {
        this.form.controls.passwordConfirm.setErrors({
          passwordsDontMatch: true,
        });
      }
    } else {
      if (this.form.controls.passwordConfirm.hasError('required')) {
        this.form.controls.passwordConfirm.setErrors({ required: true });
      } else {
        this.form.controls.passwordConfirm.setErrors(null);
      }
    }
  }
}
