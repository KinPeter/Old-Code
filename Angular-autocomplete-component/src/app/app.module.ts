import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AutocompleteModule } from './autocomplete/autocomplete.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AutocompleteModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
