import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../Pages/home/home').then(m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('../Pages/login/login').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('../Pages/register/register').then(m => m.RegisterPage)
  },
  {
    path: 'browse',
    loadComponent: () => import('../Pages/browse/browse').then(m => m.BrowsePage)
  },
  {
    path: 'book/:id',
    loadComponent: () => import('../Features/Books/book-detail/book-detail').then(m => m.BookDetailPage)
  },
  {
    path: '**',
    loadComponent: () => import('../Pages/not-found/not-found').then(m => m.NotFoundPage)
  }
];
