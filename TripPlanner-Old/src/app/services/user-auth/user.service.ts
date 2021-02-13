import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, PasswordResetRequest, UserProfileData } from '~/app/types/user.types';
import { UiService } from '~/app/services/ui.service';
import { SignupRequest, SignupResponse } from '~/app/types/auth.types';
import { ApiService } from '~/app/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser = new BehaviorSubject<User>(null);

  constructor(private api: ApiService, private ui: UiService) {}

  public setUser(user: User): void {
    this._currentUser.next(user);
  }

  public currentUser: Observable<User> = this._currentUser.asObservable();

  async signUp(email: string, password: string, displayName: string): Promise<void> {
    const response = await this.api.post<SignupRequest, SignupResponse>(
      '/users/signup',
      {
        email,
        password,
        displayName,
      },
      {
        handleError: false,
      },
    );
    if (response instanceof HttpErrorResponse) {
      if (response.status === 409) {
        this.ui.error('It seems that this email is already registered.');
      } else {
        this.ui.error();
      }
      return;
    }
    this.ui.success('Thank you! You can now log in with your credentials.');
    this.ui.showLogin();
  }

  async updateUser(profileData: UserProfileData): Promise<void> {
    const response = await this.api.patch<UserProfileData, any>(
      `/users/update/${this._currentUser.value.id}`,
      profileData,
      { handleError: true, errorMessage: 'Could not update your profile.' },
    );
    if (response instanceof HttpErrorResponse) return;
    this.updateLocalProfile(profileData);
    this.ui.success('Profile updated successfully!');
  }

  async updateUserPassword(newPassword: string): Promise<void> {
    const response = await this.api.post(
      `/users/change-password/${this._currentUser.value.id}`,
      { newPassword },
      { handleError: true, errorMessage: 'Could not update your profile.' },
    );
    if (response instanceof HttpErrorResponse) return;
    this.ui.success('Profile updated successfully!');
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const response = await this.api.post(
      `/users/password-reset-request`,
      { email },
      { handleError: true, errorMessage: 'Could not send the password reset email.' },
    );
    if (response instanceof HttpErrorResponse) return;
    this.ui.success('Please check your inbox for the password reset email!');
  }

  async resetPassword(requestBody: PasswordResetRequest): Promise<void> {
    const response = await this.api.post('/users/reset-password', requestBody, {
      handleError: true,
      errorMessage: 'Could not update your password. Please try again or contact us.',
    });
    if (response instanceof HttpErrorResponse) return;
    this.ui.success('New password saved. Now you can log in with your new credentials!');
  }

  async deleteUserAccount(): Promise<void> {
    const response = await this.api.delete(`/users/delete/${this._currentUser.value.id}`, {
      handleError: true,
      errorMessage: 'Could not delete your account. Please try again or contact us.',
    });
    if (response instanceof HttpErrorResponse) return;
    this.ui.info('Account deleted. Sorry to see you go... :(');
    setTimeout(() => {
      sessionStorage.clear();
      location.reload();
    }, 3000);
  }

  increaseLocalNumberOfTrips(): void {
    const updatedUser: User = {
      ...this._currentUser.value,
      numberOfTrips: this._currentUser.value.numberOfTrips + 1,
    };
    this.updateLocalUser(updatedUser);
  }

  decreaseLocalNumberOfTrips(): void {
    const updatedUser: User = {
      ...this._currentUser.value,
      numberOfTrips: this._currentUser.value.numberOfTrips - 1,
    };
    this.updateLocalUser(updatedUser);
  }

  private updateLocalProfile(profileData: UserProfileData): void {
    const updatedUser: User = {
      ...this._currentUser.value,
      ...profileData,
    };
    this.updateLocalUser(updatedUser);
  }

  private updateLocalUser(updatedUser: User): void {
    this.setUser(updatedUser);
    sessionStorage.setItem('tp-user', JSON.stringify(updatedUser));
  }
}
