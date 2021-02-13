import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '~/app/utils/custom-validators'
import { UserService } from '~/app/services/user/user.service'

@Component({
  selector: 'tp-signup',
  template: `
    <mat-card>
      <mat-card-title>{{ 'auth.c.signup.title' | translate }}</mat-card-title>
      <mat-card-subtitle>{{ 'auth.c.signup.subtitle' | translate }}</mat-card-subtitle>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()" [formGroup]="form">
          <div>
            <mat-form-field appearance="fill">
              <mat-label>{{ 'auth.c.signup.displayName' | translate }}</mat-label>
              <input matInput type="text" autocomplete="nickname" formControlName="displayName" />
              <mat-error *ngIf="form.getError('required', 'displayName')">
                {{ 'auth.c.signup.displayNameRequired' | translate }}
              </mat-error>
            </mat-form-field>
          </div>
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
          <div formGroupName="passwords">
            <div>
              <mat-form-field appearance="fill">
                <mat-label>{{ 'auth.c.common.password' | translate }}</mat-label>
                <input
                  matInput
                  type="password"
                  autocomplete="password"
                  formControlName="password"
                />
                <mat-error *ngIf="form.getError('required', ['passwords', 'password'])">
                  {{ 'auth.c.common.passwordRequired' | translate }}
                </mat-error>
                <mat-error *ngIf="form.getError('minlength', ['passwords', 'password'])">
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
                <mat-error *ngIf="form.getError('required', ['passwords', 'confirmPassword'])">
                  {{ 'auth.c.common.passwordRequired' | translate }}
                </mat-error>
              </mat-form-field>
            </div>
          </div>
          <mat-error class="non-field-error" *ngIf="form.get('passwords').hasError('notMatch')">
            {{ 'auth.c.common.passwordsDoNotMatch' | translate }}
          </mat-error>
          <button mat-flat-button color="accent" type="submit" [disabled]="!form.valid">
            {{ 'auth.signup' | translate | uppercase }}
          </button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['../auth-common-styles.scss'],
  styles: [``]
})
export class SignupComponent implements OnInit {
  public form: FormGroup
  @Output() public success: EventEmitter<string> = new EventEmitter<string>()

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword: ['', Validators.required]
        },
        { validator: CustomValidators.passwordsMatch }
      )
    })
  }

  public async onSubmit(): Promise<void> {
    const signupSuccess = await this.userService.signUp(
      this.form.value.email,
      this.form.value.passwords.password,
      this.form.value.displayName
    )
    if (signupSuccess) {
      this.success.emit(this.form.value.email)
    }
  }
}
