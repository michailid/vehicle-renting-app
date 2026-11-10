import { CanActivateFn, Router } from '@angular/router';
import { LOGGED_USER_KEY } from '../constants/constants';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const loggedData = localStorage.getItem(LOGGED_USER_KEY);
  if (loggedData) {
    return true;
  } else {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
};
