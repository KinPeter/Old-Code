import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from '~/app/admin/admin-routing.module';
import { MdEditorComponent } from '~/app/admin/components/md-editor.component';
import { SharedModule } from '~/app/shared.module';
import { IconsModule } from '~/app/components/shared/icons/icons.module';
import { LoginComponent } from '~/app/admin/pages/login.component';
import { AboutAdminComponent } from '~/app/admin/pages/about-admin.component';
import { AuthService } from '~/app/admin/services/auth.service';
import { AdminApiService } from '~/app/admin/services/admin-api.service';
import { AdminComponent } from '~/app/admin/admin.component';
import { AdminMenuBarComponent } from '~/app/admin/components/admin-menu-bar.component';
import { FiltersAdminComponent } from './pages/filters-admin.component';
import { PortfolioAdminComponent } from './pages/portfolio-admin.component';
import { AdminAboutService } from '~/app/admin/services/admin-about.service';
import { AdminPortfolioService } from './services/admin-portfolio.service';
import { PortfolioItemListComponent } from '~/app/admin/components/portfolio-item-list.component';
import { SnackbarComponent } from '~/app/admin/components/snackbar.component';
import { SnackbarService } from '~/app/admin/services/snackbar.service';

@NgModule({
  declarations: [
    AdminComponent,
    MdEditorComponent,
    LoginComponent,
    AboutAdminComponent,
    AdminMenuBarComponent,
    FiltersAdminComponent,
    PortfolioAdminComponent,
    PortfolioItemListComponent,
    SnackbarComponent,
  ],
  imports: [CommonModule, SharedModule, IconsModule, FormsModule, AdminRoutingModule],
  providers: [
    AuthService,
    AdminApiService,
    AdminAboutService,
    AdminPortfolioService,
    SnackbarService,
  ],
})
export class AdminModule {}
