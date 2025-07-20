import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Posts } from './components/posts/posts';
import { Register } from './components/register/register';
// import { Profile } from './components/profile/profile';

export const routes: Routes = [
  { path: 'home', title: 'Home', component: Home },
  { path: 'posts', title: 'Explorar', component: Posts },
  { path: 'register', title: 'Registro', component: Register },
//   { path: 'profile', title: 'Perfil', component: Profile },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', title: '404 | Page Not Found', component: PageNotFound }
];
