import { Injectable } from '@angular/core'
import { BaseDialogFactory } from '~/app/services/core/base-dialog.factory'
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { ForgotPasswordDialogComponent } from '~/app/modules/auth/forgot-password-dialog/forgot-password-dialog.component'

@Injectable()
export class AuthDialogFactory {
  constructor(private baseDialogFactory: BaseDialogFactory) {}

  public openForgotPasswordDialog(): MatDialogRef<ForgotPasswordDialogComponent, unknown> {
    return this.baseDialogFactory.open<ForgotPasswordDialogComponent, MatDialogConfig, unknown>(
      ForgotPasswordDialogComponent,
      { disableClose: false }
    )
  }
}
