import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '~/app/services/user/user.service'
import { CustomValidators } from '~/app/utils/custom-validators'

@Component({
  selector: 'tp-password-reset',
  template: `
    <mat-card>
      <mat-card-title>{{ 'auth.c.resetPassword.title' | translate }}</mat-card-title>
      <mat-card-subtitle>
        {{ 'auth.c.resetPassword.yourEmail' | translate }}{{ email }}
      </mat-card-subtitle>
      <mat-card-subtitle>{{ 'auth.c.resetPassword.subtitle' | translate }}</mat-card-subtitle>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()" [formGroup]="form">
          <div>
            <mat-form-field appearance="fill">
              <mat-label>{{ 'auth.c.common.password' | translate }}</mat-label>
              <input matInput type="password" autocomplete="password" formControlName="password" />
              <mat-error *ngIf="form.getError('required', 'password')">
                {{ 'auth.c.common.passwordRequired' | translate }}
              </mat-error>
              <mat-error *ngIf="form.getError('minlength', 'password')">
                {{ 'auth.c.common.passwordMustBeLonger' | translate: { char: 4 } }}
              </mat-error>
            </mat-form-field>
          </div>
          <div>
            <mat-form-field appearance="fill">
              <mat-label>{{ 'auth.c.common.confirmPassword' | translate }}</mat-label>
              <input
                matInput
                type="password"
                autocomplete="password"
                formControlName="confirmPassword"
              />
              <mat-error *ngIf="form.getError('required', 'confirmPassword')">
                {{ 'auth.c.common.passwordRequired' | translate }}
              </mat-error>
            </mat-form-field>
          </div>
          <mat-error class="non-field-error" *ngIf="form.hasError('notMatch')">
            {{ 'auth.c.common.passwordsDoNotMatch' | translate }}
          </mat-error>
          <button mat-flat-button color="accent" type="submit" [disabled]="!form.valid">
            {{ 'auth.c.resetPassword.reset' | translate | uppercase }}
          </button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['../auth-common-styles.scss'],
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      mat-card {
        width: 320px;
        max-width: 100%;
        margin-top: 2rem;
      }
    `
  ]
})
export class PasswordResetComponent implements OnInit {
  public form: FormGroup
  public email: string
  public resetToken: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.email = params.email
      this.resetToken = params.resetToken
    })
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: CustomValidators.passwordsMatch }
    )
  }

  public onSubmit(): void {
    this.userService.resetPassword({
      email: this.email,
      resetToken: this.resetToken,
      newPassword: this.form.value.confirmPassword
    })
    this.router.navigate(['/'])
  }
}
