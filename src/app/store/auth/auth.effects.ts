import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from "rxjs";
import * as authActions from './auth.actions';
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((action) =>
        this.authService
          .login(action.data)
          .pipe(
            map((data) =>
            authActions.loginSuccess({
                data
              })
            ),
            catchError((error) =>
              of(authActions.loginFailure({ error }))
            )
          )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.logout),
      exhaustMap(() =>
        this.authService
          .logOut()
          .pipe(
            map(() =>
            authActions.logoutSuccess()
            ),
            catchError((error) =>
              of(authActions.logoutFailure({ error }))
            )
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}