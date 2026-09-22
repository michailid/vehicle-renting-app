import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Vehicles } from './pages/vehicles/vehicles';
import { Customers } from './pages/customers/customers';
import { Bookings } from './pages/bookings/bookings';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'vehicles',
    component: Vehicles,
  },
  {
    path: 'customers',
    component: Customers,
  },
  {
    path: 'bookings',
    component: Bookings,
  },
];
