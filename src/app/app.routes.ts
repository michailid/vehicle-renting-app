import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Vehicles } from './pages/vehicles/vehicles';
import { Customers } from './pages/customers/customers';
import { Bookings } from './pages/bookings/bookings';
import { authGuard } from './guards/auth-guard';
import { AddNewVehicle } from './pages/add-new-vehicle/add-new-vehicle';

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
    canActivate: [authGuard],
  },
  {
    path: 'vehicles',
    component: Vehicles,
    canActivate: [authGuard],
  },
  {
    path: 'vehicles/add',
    component: AddNewVehicle,
    canActivate: [authGuard],
  },
  {
    path: 'customers',
    component: Customers,
    canActivate: [authGuard],
  },
  {
    path: 'bookings',
    component: Bookings,
    canActivate: [authGuard],
  },
];
