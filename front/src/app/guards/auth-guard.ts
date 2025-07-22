import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    // Si NO hay token, redirigir a login
    router.navigate(['/login']);
    return false;
  }

  // Si hay token, permitir el acceso
  return true;
};
