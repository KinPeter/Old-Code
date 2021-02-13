import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { UserService } from '~/app/services/user-auth/user.service';
import { environment } from '~/environments/environment';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.startsWith(environment.API_URL)) {
      return next.handle(req);
    }
    return this.userService.currentUser.pipe(
      take(1),
      exhaustMap(user => {
        if (!user || !user.token) {
          return next.handle(req);
        } else {
          const clone = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${user.token}`),
          });
          return next.handle(clone);
        }
      }),
    );
  }
}
