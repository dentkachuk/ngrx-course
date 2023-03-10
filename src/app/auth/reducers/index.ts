import { createReducer, on } from '@ngrx/store';
import { User } from 'app/auth/model/user.model';
import { AuthActions } from 'app/auth/action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user: undefined
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    }
  })
);
