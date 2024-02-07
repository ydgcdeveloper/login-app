import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated() ? true : inject(Router).createUrlTree(['/login']);
};


export const loggedInGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated() ? inject(Router).createUrlTree(['/']) : true;
};
