import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { EditorComponent } from '~/app/modules/editor/editor.component'

const routes: Routes = [{ path: '', component: EditorComponent }]

@NgModule({
  declarations: [EditorComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [],
  providers: []
})
export class EditorModule {}
