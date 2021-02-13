import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '~/app/utils/custom-validators'

@Component({
  selector: 'tp-change-password',
  template: `
    <mat-card>
      <mat-card-title>{{ 'profile.changePassword.title' | translate }}</mat-card-title>
      <mat-card-subtitle>{{ 'profile.changePassword.subtitle' | translate }}</mat-card-subtitle>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()" [formGroup]="form">
          <div>
            <mat-form-field fullWidth appearance="outline">
              <mat-label>{{ 'profile.changePassword.newPassword' | translate }}</mat-label>
              <input matInput type="password" autocomplete="password" formControlName="password" />
              <mat-error *ngIf="form.getError('required', 'password')">
                {{ 'profile.changePassword.passwordRequired' | translate }}
              </mat-error>
              <mat-error *ngIf="form.getError('minlength', 'password')">
                {{ 'profile.changePassword.passwordMustBeLonger' | translate: { char: 4 } }}
              </mat-error>
            </mat-form-field>
          </div>
          <div>
            <mat-form-field fullWidth appearance="outline">
              <mat-label>{{ 'profile.changePassword.confirmPassword' | translate }}</mat-label>
              <input
                matInput
                type="password"
                autocomplete="password"
                formControlName="confirmPassword"
              />
              <mat-error *ngIf="form.getError('required', 'confirmPassword')">
                {{ 'profile.changePassword.passwordRequired' | translate }}
              </mat-error>
            </mat-form-field>
          </div>
          <mat-error class="non-field-error" *ngIf="form.hasError('notMatch')">
            {{ 'profile.changePassword.passwordsDoNotMatch' | translate }}
          </mat-error>
          <div class="actions">
            <button mat-flat-button color="accent" type="submit" [disabled]="!form.valid">
              {{ 'profile.changePassword.change' | translate | uppercase }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['../profile-common-styles.scss']
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup

  @Output()
  public changePassword: EventEmitter<string> = new EventEmitter<string>()

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: CustomValidators.passwordsMatch }
    )
  }

  public onSubmit(): void {
    this.changePassword.emit(this.form.value.password)
  }
}
