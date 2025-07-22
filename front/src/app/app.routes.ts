import { Routes } from '@angular/router';
import { MainGlim } from './components/main-glim/main-glim';
import { Posts } from './components/posts/posts';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { Profile } from './components/profile/profile';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { guestGuard } from './guards/guest-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'main', title: 'Main', component: MainGlim, canActivate: [authGuard] },
  { path: 'posts', title: 'Explorar', component: Posts, canActivate: [authGuard] },
  { path: 'profile', title: 'Profile', component: Profile, canActivate: [authGuard] },

  { path: 'login', title: 'Login', component: Login, canActivate: [guestGuard] },
  { path: 'register', title: 'Register', component: Register, canActivate: [guestGuard] },
  { path: 'forgot-password', title: 'Forgot-password', component: ForgotPassword },

  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', title: '404 | Page Not Found', component: PageNotFound }
];