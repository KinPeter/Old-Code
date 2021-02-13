import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '~/app/types/user.types';
import { UiService } from '~/app/services/ui.service';
import { UserService } from '~/app/services/user-auth/user.service';
import { ApiService } from '~/app/services/api/api.service';
import { LoginRequest } from '~/app/types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = new BehaviorSubject<boolean>(false);
  // @ts-ignore
  private sessionTimer: NodeJS.Timer;

  constructor(
    private userService: UserService,
    private ui: UiService,
    private api: ApiService,
    private router: Router,
  ) {}

  isLoggedIn(): boolean {
    return this.isAuth.value;
  }

  async login(email: string, password: string): Promise<void> {
    const response = await this.api.post<LoginRequest, User>(
      '/users/login',
      { email, password },
      { handleError: true, errorMessage: 'Could not log you in. Please check your credentials.' },
    );
    if (response instanceof HttpErrorResponse) return;
    this.handleLogin(response);
    this.ui.hideLogin();
  }

  private handleLogin(response: User): void {
    console.log(response);
    this.userService.setUser(response);
    this.isAuth.next(true);

    sessionStorage.setItem('tp-user', JSON.stringify(response));
    sessionStorage.setItem('tp-expires', response.expiresAt.toString());
    this.handleSessionExpiry(response.expiresAt);
    this.ui.success('Successfully logged in!');
  }

  autoLogin(): void {
    const expires = sessionStorage.getItem('tp-expires');
    const userData: User = JSON.parse(sessionStorage.getItem('tp-user'));
    if (!expires || !userData || +expires < new Date().getTime()) {
      return this.logOut({ auto: true });
    }
    this.userService.setUser(userData);
    this.handleSessionExpiry(+expires);
    this.isAuth.next(true);
  }

  private handleSessionExpiry(expires: number): void {
    const now = new Date().getTime();
    const minutesLeft = Math.floor((expires - now) / 1000 / 60);
    if (minutesLeft < 15) {
      this.showSessionWarning();
    } else {
      this.sessionTimer = setTimeout(() => {
        this.showSessionWarning();
      }, (minutesLeft - 15) * 60 * 1000);
    }
  }

  private showSessionWarning(): void {
    this.ui.important('Your session will expire soon! Please save your progress and log in again.');
  }

  logOut(config: { auto: boolean } = { auto: false }): void {
    sessionStorage.removeItem('tp-user');
    sessionStorage.removeItem('tp-expires');
    this.userService.setUser(null);
    this.isAuth.next(false);
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
    if (!config.auto) {
      this.router.navigate(['/']);
      this.ui.info('See you! Until next time...');
    }
  }
}
