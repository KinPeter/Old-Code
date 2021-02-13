import {
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '~/app/services/user-auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      return this.router.createUrlTree(['/']);
    }
  }

  canLoad(route: Route) {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      return this.router.navigate(['/']);
    }
  }
}
