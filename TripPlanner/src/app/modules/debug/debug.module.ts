import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SharedModule } from '~/app/modules/common/shared.module'
import { FileDebugComponent } from './file-debug.component'
import { DebugComponent } from '~/app/modules/debug/debug.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DebugComponent },
  { path: 'file', component: FileDebugComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
  declarations: [DebugComponent, FileDebugComponent],
  providers: []
})
export class DebugModule {}
