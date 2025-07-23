import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return router.createUrlTree(['/posts']);
  } else {
    return true;
  }
};
