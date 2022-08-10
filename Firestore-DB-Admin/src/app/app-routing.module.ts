import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
    { path: '', component: AuthComponent },
    {
        path: 'tiles',
        loadChildren: './tiles/tiles.module#TilesModule',
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'links',
        loadChildren: './links/links.module#LinksModule',
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
