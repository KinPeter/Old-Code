import { Component, Inject, OnInit } from '@angular/core'
import { ThemePalette } from '@angular/material/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

import { ConfirmationAction, ConfirmationParams } from '~/app/types/confirmation-dialog.types'

@Component({
  selector: 'tp-confirmation-dialog',
  template: `
    <h1 *ngIf="!!data.title" matDialogTitle>{{ data.title }}</h1>

    <mat-dialog-content>
      <p>{{ data.body }}</p>
    </mat-dialog-content>

    <mat-dialog-actions>
      <ng-container *ngFor="let action of data.actions; let i = index">
        <button mat-button [color]="getButtonColor(action)" [mat-dialog-close]="action">
          {{ action }}
        </button>
      </ng-container>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        margin-bottom: 1rem;
      }
      mat-dialog-actions {
        display: flex;
        justify-content: flex-end;
      }
    `
  ]
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationParams) {}

  public ngOnInit(): void {}

  public getButtonColor(action: ConfirmationAction): ThemePalette {
    return action === ConfirmationAction.OK || action === ConfirmationAction.YES
      ? ('primary' as ThemePalette)
      : ('' as ThemePalette)
  }
}
