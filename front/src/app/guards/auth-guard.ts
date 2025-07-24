import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const storage = inject(StorageService); // inyecta el servicio

  const token = storage.getToken();

  if (!token) {
    alert('You must log in to access. You will be redirected to "Log In".');
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};