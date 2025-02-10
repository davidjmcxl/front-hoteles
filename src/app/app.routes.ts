import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { HotelesComponent } from './pages/hoteles/hoteles.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a login al inicio
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard], // 🔐 Protege el acceso al dashboard
    children: [
      {
        path: 'hoteles',
        loadComponent: () => import('./pages/hoteles/hoteles.component').then(m => m.HotelesComponent),
       
      },
      {
        path: 'habitaciones',
        loadComponent: () => import('./pages/habitaciones/habitaciones.component').then(m => m.HabitacionesComponent),
      
      },
      {
        path: 'reservas',
        loadComponent: () => import('./pages/reservas/reservas.component').then(m => m.ReservasComponent),
     
      },
      { path: '', redirectTo: 'hoteles', pathMatch: 'full' } // Página predeterminada del dashboard
    ]
  },
  { path: '**', redirectTo: 'login' } // Redirige rutas desconocidas a login
];
export const appRoutingProviders = [
  provideRouter(routes, withComponentInputBinding())
];
