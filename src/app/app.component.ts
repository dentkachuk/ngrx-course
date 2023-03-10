import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from 'app/auth/auth.selector';
import { login, logout } from 'app/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  loading = true;
  public isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {

  }

  ngOnInit() {
    const userProfile = localStorage.getItem('user');

    if (userProfile) {
      this.store.dispatch(login({user: JSON.parse(userProfile)}))
    }
    
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

  }

  logout() {
    this.store.dispatch(logout());
  }

}
