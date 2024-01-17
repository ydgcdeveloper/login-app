import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducers';

export const selectAuthState =
  createFeatureSelector<fromAuth.AuthState>(
    fromAuth.authFeatureKey
);

export const selectLoguedUser = createSelector(
    selectAuthState,
  (state) => state.entities[0]
);

export const selectLogging = createSelector(
  selectAuthState,
  (state) => state.logging
);

