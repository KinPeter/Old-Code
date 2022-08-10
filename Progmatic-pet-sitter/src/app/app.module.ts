import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutSectionComponent } from './components/front-page/about-section/about-section.component';
import { MainSearchComponent } from './components/front-page/main-search/main-search.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SitterProfilePageComponent } from './components/sitter-profile-page/sitter-profile-page.component';
import { MyProfilePageComponent } from './components/my-profile-page/my-profile-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { WannabeSitterPageComponent } from './components/wannabe-sitter-page/wannabe-sitter-page.component';
import { LoginModalComponent } from './components/header/login-modal/login-modal.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { SearchDataComponent } from './components/search-page/search-data/search-data.component';
import { SearchListComponent } from './components/search-page/search-list/search-list.component';
import { SearchListItemComponent } from './components/search-page/search-list/search-list-item/search-list-item.component';
// import { ErrorInterceptor } from './services/interceptors/error-interceptor.service';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { SitterCalendarComponent } from './components/sitter-calendar/sitter-calendar.component';
import { CalendarDatePipe } from './pipes/calendar-date.pipe';
import { SearchSitterByNamePipe } from './pipes/search-sitter-by-name.pipe';

@NgModule({
    declarations: [
        AppComponent,
        FrontPageComponent,
        HeaderComponent,
        FooterComponent,
        AboutSectionComponent,
        MainSearchComponent,
        SearchPageComponent,
        SitterProfilePageComponent,
        MyProfilePageComponent,
        RegistrationPageComponent,
        WannabeSitterPageComponent,
        LoginModalComponent,
        NavbarComponent,
        SearchDataComponent,
        SearchListComponent,
        SearchListItemComponent,
        SpinnerComponent,
        SitterCalendarComponent,
        CalendarDatePipe,
        SearchSitterByNamePipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
