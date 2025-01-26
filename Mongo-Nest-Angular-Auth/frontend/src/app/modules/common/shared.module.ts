import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { MaterialModule } from '~/app/modules/common/material.module'
import { CustomPipesModule } from '~/app/utils/custom-pipes.module'
import { FullWidthDirective } from '~/app/utils/full-width-directive'

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CustomPipesModule
  ],
  exports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CustomPipesModule,
    FullWidthDirective
  ],
  declarations: [FullWidthDirective],
  providers: []
})
export class SharedModule {}
