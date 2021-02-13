import { ComponentType } from '@angular/cdk/portal'
import { Injectable } from '@angular/core'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'

const defaultConfig: MatDialogConfig = {
  width: '320px',
  maxWidth: '100%',
  closeOnNavigation: true,
  disableClose: true,
  data: {}
}

@Injectable({ providedIn: 'root' })
export class BaseDialogFactory {
  constructor(private dialog: MatDialog) {}

  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @typescript-eslint/ban-types */
  public open<T, D extends object, R = any>(
    dialogRef: ComponentType<T>,
    config?: MatDialogConfig<D>
  ): MatDialogRef<T, R> {
    const finalConfig: MatDialogConfig<D> = { ...defaultConfig, ...config }
    return this.dialog.open<T, D, R>(dialogRef, finalConfig)
  }
}
