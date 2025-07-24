import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    alert('You must log in to acces. You will be send to "Log In"');
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
