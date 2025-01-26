import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProfileComponent } from '~/app/modules/profile/profile.component'
import { ChangePasswordComponent } from '~/app/modules/profile/change-password/change-password.component'
import { SharedModule } from '~/app/modules/common/shared.module'
import { UserStatsComponent } from '~/app/modules/profile/user-stats/user-stats.component'

const routes: Routes = [{ path: '', component: ProfileComponent }]

@NgModule({
  declarations: [ProfileComponent, ChangePasswordComponent, UserStatsComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
  providers: []
})
export class ProfileModule {}
