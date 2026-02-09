import { Routes } from '@angular/router';
import { authGuard } from '../Core/guards/auth-guards-guard';

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
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'orders',
        loadComponent: () => import('../Pages/orders/orders').then(m => m.OrdersPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../Pages/profile/profile').then(m => m.ProfilePage)
      },
      {
        path: 'cart',
        loadComponent: () => import('../Pages/cart/cart').then(m => m.CartPage)
      },
      {
        path: 'store-analytics',
        loadComponent: () => import('../Pages/store-analytics/store-analytics').then(m => m.StoreAnalyticsPage)
      },
      {
        path: 'store-dashboard',
        loadComponent: () => import('../Pages/store-dashboard/store-dashboard').then(m => m.StoreDashboardPage)
      },
      {
        path: 'store-info',
        loadComponent: () => import('../Pages/store-info/store-info').then(m => m.StoreInfoPage)
      },
      {
        path: 'store-my-books',
        loadComponent: () => import('../Pages/store-my-books/store-my-books').then(m => m.StoreMyBooksPage)
      },
      {
        path: 'store-orders',
        loadComponent: () => import('../Pages/store-orders/store-orders').then(m => m.StoreOrdersPage)
      },
      {
        path: 'store-settings',
        loadComponent: () => import('../Pages/store-settings/store-settings').then(m => m.StoreSettingsPage)
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('../Pages/not-found/not-found').then(m => m.NotFoundPage)
  }
];
