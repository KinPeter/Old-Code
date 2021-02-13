import { Component, OnInit } from '@angular/core'
import { AuthService } from '~/app/services/auth/auth.service'

@Component({
  selector: 'tp-account-menu',
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="accountMenu"
      [matTooltip]="'accountMenu.tooltip' | translate"
    >
      <mat-icon>person</mat-icon>
    </button>
    <mat-menu #accountMenu="matMenu">
      <button mat-menu-item routerLink="/profile">
        <mat-icon>account_circle</mat-icon>
        {{ 'accountMenu.myProfile' | translate }}
      </button>
      <button mat-menu-item (click)="onLogout()">
        <mat-icon>exit_to_app</mat-icon>
        {{ 'accountMenu.logout' | translate }}
      </button>
    </mat-menu>
  `,
  styles: [``]
})
export class AccountMenuComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  public onLogout(): void {
    this.auth.logOut()
  }
}
