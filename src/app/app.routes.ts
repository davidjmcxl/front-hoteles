import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { HotelesComponent } from './pages/hoteles/hoteles.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a login al inicio
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'hoteles',
    loadComponent: () => import('./pages/hoteles/hoteles.component').then(m => m.HotelesComponent)
  },
  { path: '**', redirectTo: 'login' } // Redirige rutas desconocidas a login
];
export const appRoutingProviders = [
  provideRouter(routes, withComponentInputBinding())
];
