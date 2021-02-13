import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '~/app/services/auth/auth.service'
import { AuthDialogFactory } from '~/app/modules/auth/auth-dialog.factory'

@Component({
  selector: 'tp-login',
  template: `
    <mat-card>
      <mat-card-title>{{ 'auth.c.login.title' | translate }}</mat-card-title>
      <mat-card-subtitle>{{ 'auth.c.login.subtitle' | translate }}</mat-card-subtitle>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()" [formGroup]="form">
          <div>
            <mat-form-field appearance="fill">
              <mat-label>{{ 'auth.c.common.email' | translate }}</mat-label>
              <input matInput type="email" autocomplete="email" formControlName="email" />
              <mat-error *ngIf="form.getError('email', 'email')">
                {{ 'auth.c.common.invalidEmail' | translate }}
              </mat-error>
              <mat-error *ngIf="form.getError('required', 'email')">
                {{ 'auth.c.common.emailRequired' | translate }}
              </mat-error>
            </mat-form-field>
          </div>
          <div>
            <mat-form-field appearance="fill">
              <mat-label>{{ 'auth.c.common.password' | translate }}</mat-label>
              <input matInput type="password" autocomplete="password" formControlName="password" />
              <mat-error *ngIf="form.getError('required', 'password')">
                {{ 'auth.c.common.passwordRequired' | translate }}
              </mat-error>
            </mat-form-field>
          </div>
          <button mat-flat-button color="accent" type="submit" [disabled]="!form.valid">
            {{ 'auth.login' | translate | uppercase }}
          </button>
        </form>
        <p>
          <small>
            {{ 'auth.c.login.forgotPassword' | translate }}
            <a (click)="onForgotPassword()">{{ 'auth.c.login.clickHere' | translate }}</a>
          </small>
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['../auth-common-styles.scss'],
  styles: [
    `
      p small a {
        color: var(--color-primary);
        cursor: pointer;
      }
    `
  ]
})
export class LoginComponent implements OnInit {
  public form: FormGroup
  @Input() private emailJustSignedUp: string

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private authDialogFactory: AuthDialogFactory
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    if (this.emailJustSignedUp) {
      this.form.get('email').setValue(this.emailJustSignedUp)
    }
  }

  public onSubmit(): void {
    const { email, password } = this.form.value
    this.auth.login(email, password)
  }

  public onForgotPassword(): void {
    this.authDialogFactory.openForgotPasswordDialog()
  }
}
