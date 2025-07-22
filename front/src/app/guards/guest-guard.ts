import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // Si ya hay token, redirige al main
    router.navigate(['/main']);
    return false;
  }

  // Si no hay token, permite el acceso (puede entrar a login/register)
  return true;
};
