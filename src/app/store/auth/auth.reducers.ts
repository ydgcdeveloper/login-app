import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { IUser } from 'src/app/core/interfaces/user';

export const authFeatureKey = 'auth';

export interface AuthState extends EntityState<IUser> {
  logging: boolean;
}

export const adapter = createEntityAdapter<IUser>();

export const initialState: AuthState = adapter.getInitialState({
  logging: false,
});

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state) => ({
    ...state,
    logging: true,
  })),
  on(authActions.loginSuccess, (state) => ({
    ...state,
    logging: false,
  })),
  on(authActions.loginFailure, (state) => ({
    ...state,
    logging: false,
  })),
  on(authActions.logoutSuccess, (state) => ({
    ...state,
    logging: false,
  }))
);
