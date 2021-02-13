import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthComponent } from '~/app/modules/auth/auth.component'
import { SharedModule } from '~/app/modules/common/shared.module'
import { SlidingQuotesComponent } from '~/app/modules/auth/sliding-quotes/sliding-quotes.component'
import { AuthHeaderComponent } from '~/app/modules/auth/auth-header/auth-header.component'
import { LoginComponent } from '~/app/modules/auth/login/login.component'
import { SignupComponent } from '~/app/modules/auth/signup/signup.component'
import { AuthDialogFactory } from '~/app/modules/auth/auth-dialog.factory'
import { ForgotPasswordDialogComponent } from '~/app/modules/auth/forgot-password-dialog/forgot-password-dialog.component'
import { PasswordResetComponent } from '~/app/modules/auth/password-reset/password-reset.component'

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'reset-password/:email/:resetToken', component: PasswordResetComponent },
  { path: '**', redirectTo: '/auth' }
]

@NgModule({
  declarations: [
    AuthComponent,
    AuthHeaderComponent,
    SlidingQuotesComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordDialogComponent,
    PasswordResetComponent
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
  providers: [AuthDialogFactory]
})
export class AuthModule {}
