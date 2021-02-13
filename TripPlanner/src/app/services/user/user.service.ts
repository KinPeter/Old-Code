import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { TranslateService } from '@ngx-translate/core'

import { PasswordResetRequest, User, UserInfo, UserProfileData } from '~/app/types/user.types'
import { Store } from '~/app/services/core/store'
import { ApiService } from '~/app/services/core/api.service'
import { SignupRequest, SignupResponse } from '~/app/types/auth.types'
import { SnackbarService } from '~/app/services/core/snackbar.service'
import { DateFormat } from '~/app/types/date-format'
import { Observable } from 'rxjs'

interface UserState {
  currentUser: User
}

const initialState: UserState = {
  currentUser: null
}

@Injectable({ providedIn: 'root' })
export class UserService extends Store<UserState> {
  constructor(
    private api: ApiService,
    private snackbar: SnackbarService,
    private translate: TranslateService
  ) {
    super(initialState)
  }

  public userInfo: Observable<UserInfo> = this.select(state => {
    return {
      id: state.currentUser.id,
      displayName: state.currentUser.displayName,
      photoUrl: state.currentUser.photoUrl,
      preferredDateFormat: state.currentUser.preferredDateFormat,
      memberSince: state.currentUser.memberSince,
      numberOfTrips: state.currentUser.numberOfTrips
    }
  })

  public get currentUserId(): string {
    return this.state.currentUser.id
  }

  public get preferredDateFormat(): DateFormat {
    return this.state.currentUser.preferredDateFormat
  }

  public setUser(user: User): void {
    this.setState({
      currentUser: user
    })
  }

  public async signUp(email: string, password: string, displayName: string): Promise<boolean> {
    const response = await this.api.post<SignupRequest, SignupResponse>(
      '/users/signup',
      { email, password, displayName },
      { handleError: false }
    )
    if (response instanceof HttpErrorResponse) {
      if (response.status === 409) {
        this.snackbar.error(await this.$t('user.messages.emailRegistered'))
      } else {
        this.snackbar.error()
      }
      return false
    }
    this.snackbar.success(await this.$t('user.messages.signupSuccess'))
    return true
  }

  public async fetchCurrentUserInfo(): Promise<void> {
    const response = await this.api.get<UserInfo>(`/users/${this.state.currentUser.id}`, {
      handleError: true,
      errorMessage: await this.$t('user.messages.fetchFailed')
    })
    if (response instanceof HttpErrorResponse) return
    this.updateLocalUser(response)
  }

  public async updateUser(profileData: UserProfileData): Promise<UserInfo> {
    const response = await this.api.put<UserProfileData, UserInfo>(
      `/users/${this.state.currentUser.id}`,
      profileData,
      {
        handleError: true,
        errorMessage: await this.$t('user.messages.updateFailed')
      }
    )
    if (response instanceof HttpErrorResponse) return
    this.updateLocalUser(response)
    this.snackbar.success(await this.$t('user.messages.updateSuccess'))
  }

  public async updateUserPassword(newPassword: string): Promise<void> {
    const response = await this.api.post(
      `/users/change-password/${this.state.currentUser.id}`,
      { newPassword },
      {
        handleError: true,
        errorMessage: await this.$t('user.messages.updateFailed')
      }
    )
    if (response instanceof HttpErrorResponse) return
    this.snackbar.success(await this.$t('user.messages.updateSuccess'))
  }

  public async sendPasswordResetEmail(email: string): Promise<void> {
    const response = await this.api.post(
      `/users/password-reset-request`,
      { email },
      {
        handleError: true,
        errorMessage: await this.translate
          .get('user.messages.passwordResetEmailNotSent')
          .toPromise()
      }
    )
    if (response instanceof HttpErrorResponse) return
    this.snackbar.success(await this.$t('user.messages.passwordResetEmailSent'))
  }

  public async resetPassword(requestBody: PasswordResetRequest): Promise<void> {
    const response = await this.api.post('/users/reset-password', requestBody, {
      handleError: true,
      errorMessage: await this.$t('user.messages.resetPasswordFailed')
    })
    if (response instanceof HttpErrorResponse) return
    this.snackbar.success(await this.$t('user.messages.resetPasswordSuccess'))
  }

  public async deleteUserAccount(): Promise<void> {
    const response = await this.api.delete(`/users/${this.state.currentUser.id}`, {
      handleError: true,
      errorMessage: await this.$t('user.messages.deleteAccountFailed')
    })
    if (response instanceof HttpErrorResponse) return
    this.snackbar.info(await this.$t('user.messages.deleteAccountSuccess'))
    setTimeout(() => {
      localStorage.clear()
      location.reload()
    }, 3000)
  }

  private updateLocalUser(userData: Partial<User>): void {
    const updatedUser: User = {
      ...this.state.currentUser,
      ...userData
    }
    this.setState({
      currentUser: updatedUser
    })
    localStorage.setItem('tp-user', JSON.stringify(updatedUser))
  }

  private $t(translationKey: string): Promise<string> {
    return this.translate.get(translationKey).toPromise()
  }
}
