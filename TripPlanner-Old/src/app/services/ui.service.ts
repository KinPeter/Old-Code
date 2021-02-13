import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const snackBarConfig: MatSnackBarConfig = {
  horizontalPosition: 'start',
  verticalPosition: 'bottom',
};

const defaultErrorMessage =
  'An error occurred during your request. Please try again later or contact the administrator.';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  public loginShown = new BehaviorSubject<boolean>(false);
  public isLoading = new BehaviorSubject<boolean>(false);
  private progresses: boolean[];

  constructor(private snackBar: MatSnackBar) {
    this.progresses = [];
  }

  showLogin(): void {
    this.loginShown.next(true);
  }
  hideLogin(): void {
    this.loginShown.next(false);
  }

  startLoading(): void {
    this.isLoading.next(true);
    this.progresses.push(true);
  }
  stopLoading(): void {
    if (this.progresses.length === 0) {
      this.isLoading.next(false);
    } else if (this.progresses.length === 1) {
      this.progresses.pop();
      this.isLoading.next(false);
    } else {
      this.progresses.pop();
    }
  }

  success(message: string): void {
    this.snackBar.open('✔ ' + message, undefined, {
      ...snackBarConfig,
      duration: 3000,
      panelClass: ['snackbar-margin', 'snackbar-success'],
    });
  }
  error(message: string = defaultErrorMessage): void {
    this.snackBar.open('⛔ ERROR: ' + message, 'OK', {
      ...snackBarConfig,
      panelClass: ['snackbar-margin', 'snackbar-error'],
    });
  }
  info(message: string): void {
    this.snackBar.open('❕ ' + message, undefined, {
      ...snackBarConfig,
      duration: 3000,
      panelClass: ['snackbar-margin', 'snackbar-info'],
    });
  }
  important(message: string): void {
    this.snackBar.open('❕ ' + message, 'OK', {
      ...snackBarConfig,
      panelClass: ['snackbar-margin', 'snackbar-info'],
    });
  }
}
