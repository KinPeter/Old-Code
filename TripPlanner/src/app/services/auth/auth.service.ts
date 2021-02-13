import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
import { TranslateService } from '@ngx-translate/core'

import { User } from '~/app/types/user.types'
import { ApiService } from '~/app/services/core/api.service'
import { LoginRequest, TokenResponse } from '~/app/types/auth.types'
import { SnackbarService } from '~/app/services/core/snackbar.service'
import { AuthStore } from '~/app/services/auth/auth.store'
import { UserService } from '~/app/services/user/user.service'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Timeout = NodeJS.Timeout

@Injectable({ providedIn: 'root' })
export class AuthService {
  private refreshTimer: Timeout

  constructor(
    private userService: UserService,
    private authStore: AuthStore,
    private snackbar: SnackbarService,
    private api: ApiService,
    private router: Router,
    private translate: TranslateService
  ) {}

  public async login(email: string, password: string): Promise<void> {
    const response = await this.api.post<LoginRequest, User>(
      '/users/login',
      { email, password },
      {
        handleError: true,
        errorMessage: await this.$t('auth.messages.badCredentials')
      }
    )
    if (response instanceof HttpErrorResponse) return
    await this.handleLogin(response)
  }

  private async handleLogin(userResponse: User): Promise<void> {
    console.log(userResponse)
    this.userService.setUser(userResponse)
    this.authStore.setLogin(userResponse.token)
    this.scheduleTokenRefresh(userResponse.expiresAt, userResponse)

    localStorage.setItem('tp-user', JSON.stringify(userResponse))
    localStorage.setItem('tp-expires', userResponse.expiresAt.toString())

    await this.router.navigate(['/my-trips'])
    this.snackbar.success(await this.$t('auth.messages.loginSuccess'))
  }

  public autoLogin(): void {
    const expires = localStorage.getItem('tp-expires')
    const userData: User = JSON.parse(localStorage.getItem('tp-user'))
    if (!expires || !userData || +expires < new Date().getTime()) {
      this.logOut({ auto: true })
      return
    }
    this.scheduleTokenRefresh(+expires, userData)
    this.userService.setUser(userData)
    this.authStore.setLogin(userData.token)
  }

  private scheduleTokenRefresh(expires: number, user: User): void {
    this.unscheduleTokenRefresh()
    const now = new Date().getTime()
    const minutesLeft = Math.floor((expires - now) / 1000 / 60)
    if (minutesLeft < 30) {
      this.refreshToken(user)
    } else {
      this.refreshTimer = setTimeout(() => {
        this.refreshToken(user)
      }, (minutesLeft - 30) * 60 * 1000)
    }
  }

  private unscheduleTokenRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
      this.refreshTimer = undefined
    }
  }

  private async refreshToken(user: User): Promise<void> {
    const response = await this.api.post<unknown, TokenResponse>(
      '/users/token-refresh/' + user.id,
      {},
      {
        handleError: true,
        errorMessage: await this.$t('auth.messages.tokenRefreshFailed')
      }
    )
    if (response instanceof HttpErrorResponse) return

    this.authStore.setLogin(response.token)
    const newUserData: User = {
      ...user,
      ...response
    }
    this.userService.setUser(newUserData)
    localStorage.setItem('tp-user', JSON.stringify(newUserData))
    localStorage.setItem('tp-expires', response.expiresAt.toString())
    this.scheduleTokenRefresh(response.expiresAt, newUserData)
  }

  public async logOut(config: { auto: boolean } = { auto: false }): Promise<void> {
    localStorage.removeItem('tp-user')
    localStorage.removeItem('tp-expires')
    this.userService.setUser(null)

    this.authStore.setLogout()
    this.unscheduleTokenRefresh()

    if (!config.auto) {
      await this.router.navigate(['/auth'])
      this.snackbar.info(await this.$t('auth.messages.logOut'))
    }
  }

  private $t(translationKey: string): Promise<string> {
    return this.translate.get(translationKey).toPromise()
  }
}
