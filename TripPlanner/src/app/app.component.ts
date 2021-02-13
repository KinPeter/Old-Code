import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Title } from '@angular/platform-browser'
import { Event, NavigationEnd, Router } from '@angular/router'

import { AuthService } from '~/app/services/auth/auth.service'
import { LoadingIndicatorService } from '~/app/services/core/loading-indicator.service'
import { fadeAnimation } from '~/app/utils/animations'

@Component({
  selector: 'tp-root',
  animations: [fadeAnimation({ in: '.2s', out: '.2s .3s' })],
  template: `
    <tp-app-bar></tp-app-bar>
    <router-outlet></router-outlet>
    <tp-loading-indicator *ngIf="loading.isLoading | async" @fade></tp-loading-indicator>
  `,
  styles: [``]
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private translateService: TranslateService,
    public loading: LoadingIndicatorService,
    private title: Title,
    private router: Router
  ) {
    this.auth.autoLogin()

    translateService.use('en')

    this.router.events.subscribe(event => this.handleTabTitle(event))
  }

  private async handleTabTitle(event: Event): Promise<void> {
    if (event instanceof NavigationEnd) {
      let newTitle: string
      switch (event.urlAfterRedirects) {
        case '/auth':
          newTitle = await this.getTitleFor('common.tabTitles.auth')
          break
        case '/profile':
          newTitle = await this.getTitleFor('common.tabTitles.profile')
          break
        case '/my-trips':
          newTitle = await this.getTitleFor('common.tabTitles.myTrips')
          break
        default:
          newTitle = event.urlAfterRedirects.startsWith('/editor')
            ? await this.getTitleFor('common.tabTitles.editor')
            : 'TripPlanner'
          break
      }
      this.title.setTitle(newTitle)
    }
  }

  private async getTitleFor(translateKey: string): Promise<string> {
    const route = await this.translateService.get(translateKey).toPromise()
    return route + ' | TripPlanner'
  }
}
