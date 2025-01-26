import { Component, Input } from '@angular/core'
import { UserInfo } from '~/app/types/user.types'

@Component({
  selector: 'tp-user-stats',
  template: `
    <mat-card>
      <mat-card-title>
        {{ 'profile.stats.title' | translate: { name: user.displayName } }}
      </mat-card-title>
      <mat-card-content>
        <p>
          {{ 'profile.stats.memberSince' | translate }}:
          <span>
            {{ user.memberSince | date: user.preferredDateFormat }}
          </span>
        </p>
        <p>
          {{ 'profile.stats.numberOfTrips' | translate }}:
          <span>
            {{ user.numberOfTrips }}
          </span>
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['../profile-common-styles.scss'],
  styles: [
    `
      mat-card-content {
        margin-top: 1rem;
      }
      p {
        margin: 0;
        color: var(--color-text-light);
      }
      span {
        color: var(--color-text-default);
      }
    `
  ]
})
export class UserStatsComponent {
  @Input() public user: UserInfo
}
