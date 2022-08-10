import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) { }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        const currentUser = this.auth.currentUser;
        if (currentUser) {
            return true;
        }

        this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
