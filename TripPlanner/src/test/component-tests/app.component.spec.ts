import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from '~/app/app.component'
import { CoreModule } from '~/app/modules/core/core.module'
import { SharedModule } from '~/app/modules/common/shared.module'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpLoaderFactory } from '~/app/utils/http-loader.factory'
import { HttpClient, HttpClientModule } from '@angular/common/http'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        SharedModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
          defaultLanguage: 'en'
        })
      ],
      declarations: [AppComponent]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
