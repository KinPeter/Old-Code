import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { AppBarComponent } from '~/app/modules/core/app-bar/app-bar.component'
import { SharedModule } from '~/app/modules/common/shared.module'
import { LoadingIndicatorComponent } from '~/app/modules/core/loading-indicator/loading-indicator.component'
import { LanguageChangerComponent } from '~/app/modules/core/language-changer/language-changer.component'
import { ConfirmationDialogComponent } from '~/app/modules/core/confirmation-dialog/confirmation-dialog.component'
import { AccountMenuComponent } from '~/app/modules/core/account-menu/account-menu.component'

@NgModule({
  declarations: [
    AppBarComponent,
    LoadingIndicatorComponent,
    LanguageChangerComponent,
    ConfirmationDialogComponent,
    AccountMenuComponent
  ],
  imports: [RouterModule, SharedModule],
  exports: [
    AppBarComponent,
    LoadingIndicatorComponent,
    LanguageChangerComponent,
    ConfirmationDialogComponent,
    AccountMenuComponent
  ],
  providers: []
})
export class CoreModule {}
