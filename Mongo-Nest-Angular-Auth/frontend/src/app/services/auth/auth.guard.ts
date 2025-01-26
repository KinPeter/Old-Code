import {
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  UrlTree
} from '@angular/router'
import { Injectable } from '@angular/core'

import { AuthStore } from '~/app/services/auth/auth.store'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private auth: AuthStore) {}

  public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): true | UrlTree {
    if (this.auth.isAuth) {
      return true
    } else {
      return this.router.createUrlTree(['/auth'])
    }
  }

  public canLoad(_route: Route): true | Promise<boolean> {
    if (this.auth.isAuth) {
      return true
    } else {
      return this.router.navigate(['/auth'])
    }
  }
}
