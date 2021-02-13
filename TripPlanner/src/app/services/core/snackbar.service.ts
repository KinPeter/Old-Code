import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'

const snackBarConfig: MatSnackBarConfig = {
  horizontalPosition: 'start',
  verticalPosition: 'bottom'
}

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private defaultMessage: string

  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) {
    this.translateService.get('common.defaultErrorMessage').subscribe(message => {
      this.defaultMessage = message
    })
  }

  public success(message: string): void {
    this.snackBar.open('✔ ' + message, undefined, {
      ...snackBarConfig,
      duration: 3000,
      panelClass: ['snackbar-success']
    })
  }
  public error(message: string = this.defaultMessage): void {
    this.snackBar.open('⛔ ERROR: ' + message, 'OK', {
      ...snackBarConfig,
      panelClass: ['snackbar-error']
    })
  }
  public info(message: string): void {
    this.snackBar.open('❕ ' + message, undefined, {
      ...snackBarConfig,
      duration: 3000,
      panelClass: ['snackbar-info']
    })
  }
  public important(message: string): void {
    this.snackBar.open('❕ ' + message, 'OK', {
      ...snackBarConfig,
      panelClass: ['snackbar-info']
    })
  }
}
