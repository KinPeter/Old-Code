import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '~/app/services/user/user.service'

@Component({
  selector: 'tp-forgot-password',
  template: `
    <div class="auth-content">
      <mat-card-title>{{ 'auth.c.forgotPassword.title' | translate }}</mat-card-title>
      <mat-card-subtitle>{{ 'auth.c.forgotPassword.subtitle' | translate }}</mat-card-subtitle>
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
        <button mat-flat-button color="accent" type="submit" [disabled]="!form.valid">
          {{ 'auth.c.forgotPassword.send' | translate | uppercase }}
        </button>
      </form>
    </div>
  `,
  styleUrls: ['../auth-common-styles.scss'],
  styles: []
})
export class ForgotPasswordDialogComponent implements OnInit {
  public form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  public async onSubmit(): Promise<void> {
    const { email } = this.form.value
    await this.userService.sendPasswordResetEmail(email)
    this.dialogRef.close()
  }
}
