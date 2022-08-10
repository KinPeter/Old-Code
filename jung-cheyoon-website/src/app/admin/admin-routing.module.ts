import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '~/app/admin/pages/login.component';
import { AboutAdminComponent } from '~/app/admin/pages/about-admin.component';
import { AuthGuard } from '~/app/admin/services/auth.guard';
import { AdminComponent } from '~/app/admin/admin.component';
import { FiltersAdminComponent } from './pages/filters-admin.component';
import { PortfolioAdminComponent } from './pages/portfolio-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutAdminComponent, canActivate: [AuthGuard] },
      { path: 'filters', component: FiltersAdminComponent, canActivate: [AuthGuard] },
      {
        path: 'portfolio',
        component: PortfolioAdminComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AdminRoutingModule {}
