import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from '~/app/help/help-routing.module';
import { HelpComponent } from '~/app/help/help.component';

@NgModule({
  declarations: [HelpComponent],
  imports: [CommonModule, HelpRoutingModule],
})
export class HelpModule {}
