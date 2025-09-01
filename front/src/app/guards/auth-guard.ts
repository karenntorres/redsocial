import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import jwt_decode from 'jwt-decode';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const storage = inject(StorageService);

  const token = storage.getToken();

  if (!token) {
    alert('You must log in to access. Redirecting to Log In.');
    router.navigateByUrl('/login');
    return false;
  }

  try {
    jwt_decode(token);
    return true;
  } catch (error) {
    console.error('Invalid token', error);
    storage.clear();
    router.navigateByUrl('/login');
    return false;
  }
};
