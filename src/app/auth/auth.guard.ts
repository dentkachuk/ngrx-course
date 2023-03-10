import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { noop, Observable } from 'rxjs';
import { isLoggedIn } from 'app/auth/auth.selector';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login').then(noop);
        }
      })
    )
  }
}
