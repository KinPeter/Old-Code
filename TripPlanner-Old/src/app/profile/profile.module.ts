import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from '~/app/profile/profile-routing.module';
import { ProfileComponent } from '~/app/profile/profile.component';
import { MaterialModule } from '~/app/material.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, MaterialModule, FormsModule],
})
export class ProfileModule {}
