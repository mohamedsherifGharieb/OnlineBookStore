import { Routes } from '@angular/router';
import { authGuard } from '../Core/guards/auth-guards-guard';
import { HomePage } from '../Pages/home/home';
import { LoginPage } from '../Pages/login/login';
import { RegisterPage } from '../Pages/register/register';
import { BrowsePage } from '../Pages/browse/browse';
import { BookDetailPage } from '../Features/Books/book-detail/book-detail';
import { OrdersPage } from '../Pages/orders/orders';
import { ProfilePage } from '../Pages/profile/profile';
import { CartPage } from '../Pages/cart/cart';
import { StoreAnalyticsPage } from '../Pages/store-analytics/store-analytics';
import { StoreDashboardPage } from '../Pages/store-dashboard/store-dashboard';
import { StoreInfoPage } from '../Pages/store-info/store-info';
import { StoreMyBooksPage } from '../Pages/store-my-books/store-my-books';
import { StoreOrdersPage } from '../Pages/store-orders/store-orders';
import { StoreSettingsPage } from '../Pages/store-settings/store-settings';
import { ServerError } from '../Shared/error/server-error/server-error';
import { NotFound } from '../Shared/error/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'browse', component: BrowsePage },
  { path: 'book/:id', component: BookDetailPage },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'orders', component: OrdersPage },
      { path: 'profile', component: ProfilePage },
      { path: 'cart', component: CartPage },
      { path: 'store-analytics', component: StoreAnalyticsPage },
      { path: 'store-dashboard', component: StoreDashboardPage },
      { path: 'store-info', component: StoreInfoPage },
      { path: 'store-my-books', component: StoreMyBooksPage },
      { path: 'store-orders', component: StoreOrdersPage },
      { path: 'store-settings', component: StoreSettingsPage },
    ]
  },
  { path: 'server-error', component: ServerError },
  { path: '**', component: NotFound },
];
