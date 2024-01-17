import { isDevMode } from '@angular/core';
import {
  MetaReducer
} from '@ngrx/store';
import * as authReducer from './auth';

export interface AuthState {
  authState: authReducer.AuthState,
}

export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];
