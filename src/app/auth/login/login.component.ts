import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'app/reducers';
import { AuthService } from '../auth.service';
import { login } from 'app/auth/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.form = fb.group({
      email: [ 'test@angular-university.io', [ Validators.required ] ],
      password: [ 'test', [ Validators.required ] ]
    });

  }

  ngOnInit() {
  }

  login() {
    const {email, password} = this.form.value;
    this.auth.login(email, password)
      .pipe(
        tap(user => {
          console.log(user);
          this.store.dispatch(login({user}));
          this.router.navigateByUrl('/courses').then(e => console.log(e));
        })
      )
      .subscribe(
        noop,
        () => alert('Login failed')
      );
  }

}

