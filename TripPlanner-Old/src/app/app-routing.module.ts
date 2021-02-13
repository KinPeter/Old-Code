import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '~/app/services/user-auth/auth.guard';
import { LandingPageComponent } from '~/app/landing-page/landing-page.component';
import { PasswordResetComponent } from '~/app/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'reset-password/:email/:resetToken',
    component: PasswordResetComponent,
  },
  {
    path: 'planner/:id',
    loadChildren: () =>
      import('./planner/planner.module').then(m => m.PlannerModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'mytrips',
    loadChildren: () =>
      import('./my-trips/my-trips.module').then(m => m.MyTripsModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then(m => m.HelpModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
