import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service'; // ajusta la ruta según tu estructura

export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const storage = inject(StorageService);

  const token = storage.getToken(); // 

  if (token) {
    alert('You are already logged in. Redirecting to your posts...');
    router.navigateByUrl('/posts');
    return false;
  }

  return true;
};
