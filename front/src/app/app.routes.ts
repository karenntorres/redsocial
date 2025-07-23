import { Routes } from '@angular/router';
import { MainGlim } from './components/main-glim/main-glim';
import { Posts } from './components/posts/posts';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: 'main', title: 'Main', component: MainGlim },
  { path: 'posts', title: 'Explorar', component: Posts },
  { path: 'register', title: 'Register', component: Register },
  { path: 'login', title: 'Login', component: Login },
  { path: 'forgot-password', title: 'Forgot-password', component: ForgotPassword },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', title: '404 | Page Not Found', component: PageNotFound }
];