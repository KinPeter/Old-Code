import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '~/app/material.module';
import { AppRoutingModule } from '~/app/app-routing.module';
import { AppComponent } from '~/app/app.component';
import { LandingPageComponent } from '~/app/landing-page/landing-page.component';
import { MenuBarComponent } from '~/app/shared/menu-bar/menu-bar.component';
import { SlidingQuotesComponent } from '~/app/landing-page/sliding-quotes/sliding-quotes.component';
import { LoginModalComponent } from '~/app/shared/login-modal/login-modal.component';
import { SignupFormComponent } from '~/app/landing-page/signup-form/signup-form.component';
import { PasswordResetComponent } from '~/app/password-reset/password-reset.component';
import { AuthInterceptorService } from '~/app/services/user-auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MenuBarComponent,
    SlidingQuotesComponent,
    LoginModalComponent,
    SignupFormComponent,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
