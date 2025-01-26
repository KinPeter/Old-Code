import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'

import { UserInfo } from '~/app/types/user.types'
import { UserService } from '~/app/services/user/user.service'
import { DateFormat } from '~/app/types/date-format'

const dateFormatOptions = [
  { text: '06 Feb 2020', value: DateFormat.DMY_LONG },
  { text: '06-02-2020', value: DateFormat.DMY_SHORT },
  { text: 'Feb 6, 2020', value: DateFormat.MDY_LONG },
  { text: '02/06/2020', value: DateFormat.MDY_SHORT },
  { text: '2020. Feb. 6.', value: DateFormat.YMD_LONG },
  { text: '2020.02.06.', value: DateFormat.YMD_SHORT }
]

@Component({
  selector: 'tp-profile',
  template: `
    <div class="profile-page">
      <tp-user-stats [user]="user"></tp-user-stats>
      <tp-change-password (changePassword)="onChangePassword($event)"></tp-change-password>
    </div>
  `,
  styles: [
    `
      .profile-page {
        max-width: 600px;
        margin: 1rem auto;
        padding: 0.5rem;
      }
    `
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: UserInfo
  public form: FormGroup

  private userSub: Subscription

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userSub = userService.userInfo.subscribe(user => {
      this.user = user
    })
  }

  ngOnInit(): void {
    this.userService.fetchCurrentUserInfo()
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  public async onChangePassword(newPassword: string): Promise<void> {
    await this.userService.updateUserPassword(newPassword)
  }
}
