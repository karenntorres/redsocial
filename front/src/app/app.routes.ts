import { Routes } from '@angular/router';
import { MainGlim } from './components/main-glim/main-glim';
import { Posts } from './components/posts/posts';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { PageNotFound } from './components/page-not-found/page-not-found';

// GUARDS
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';

export const routes: Routes = [
  { path: 'main', title: 'Main', component: MainGlim },
  { path: 'posts', title: 'Explorar', component: Posts, canActivate: [authGuard] },
  { path: 'register', title: 'Register', component: Register, canActivate: [noAuthGuard] },
  { path: 'login', title: 'Login', component: Login, canActivate: [noAuthGuard] },
  { path: 'forgot-password', title: 'Forgot-password', component: ForgotPassword },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', title: '404 | Page Not Found', component: PageNotFound }
];
