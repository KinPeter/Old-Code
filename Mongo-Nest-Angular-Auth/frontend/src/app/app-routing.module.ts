import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '~/app/services/auth/auth.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/my-trips'
  },
  {
    path: 'my-trips',
    loadChildren: () => import('./modules/trips/trips.module').then(m => m.TripsModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:tripId',
    loadChildren: () => import('./modules/editor/editor.module').then(m => m.EditorModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'debug',
    loadChildren: () => import('./modules/debug/debug.module').then(m => m.DebugModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
