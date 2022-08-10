import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '~/app/services/ui/loading.service';

@Component({
  selector: 'pk-root',
  template: `
    <router-outlet></router-outlet>
    <pk-footer></pk-footer>
    <pk-app-bar></pk-app-bar>
    <pk-side-drawer></pk-side-drawer>
    <pk-loading *ngIf="loading.getStatus() | async"></pk-loading>
  `,
  styles: [],
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    public loading: LoadingService,
    private title: Title,
    private router: Router
  ) {
    // init the translate service here
    translate.use('en');

    // logic to add when the language changes
    translate.onLangChange.subscribe(
      (event: { lang: string; translations: Record<string, unknown> }) => {
        if (event.lang === 'kr') {
          document.body.style.setProperty('--font-sans-serif', 'Noto Sans KR');
          // document.body.style.setProperty('--font-serif', 'Noto Serif KR');
        } else {
          document.body.style.setProperty('--font-sans-serif', 'Montserrat');
          // document.body.style.setProperty('--font-serif', 'Martel');
        }
      }
    );

    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        let newTitle: string;
        switch (event.urlAfterRedirects) {
          case '/about':
            newTitle = await this.getTitleFor('menu.about');
            break;
          case '/portfolio':
            newTitle = await this.getTitleFor('menu.portfolio');
            break;
          case '/admin':
            newTitle = 'Admin | Jung Cheyoon';
            break;
          case '/error':
            newTitle = 'Ooops! | Jung Cheyoon';
            break;
          default:
            newTitle = event.urlAfterRedirects.startsWith('/admin')
              ? 'Admin | Jung Cheyoon'
              : 'Jung Cheyoon';
            break;
        }
        this.title.setTitle(newTitle);
      }
    });
  }

  private async getTitleFor(translateKey: string): Promise<string> {
    const route = await this.translate.get(translateKey).toPromise();
    return route + ' | Jung Cheyoon';
  }
}
