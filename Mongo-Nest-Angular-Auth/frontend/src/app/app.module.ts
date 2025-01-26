import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { AngularFireModule } from '@angular/fire'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { environment } from '~/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpLoaderFactory } from '~/app/utils/http-loader.factory'
import { SharedModule } from '~/app/modules/common/shared.module'
import { CoreModule } from '~/app/modules/core/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      defaultLanguage: 'en'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
