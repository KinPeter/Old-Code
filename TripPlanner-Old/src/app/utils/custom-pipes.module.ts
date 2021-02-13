import { NgModule } from '@angular/core';

import { CommaPipe } from '~/app/utils/comma.pipe';

@NgModule({
  declarations: [CommaPipe],
  exports: [CommaPipe],
})
export class CustomPipesModule {}
