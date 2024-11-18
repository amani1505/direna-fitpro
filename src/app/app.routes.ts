import { Routes } from '@angular/router';
import { NotFoundComponent } from '@components/error/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/landing/landing.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('@modules/auth/auth.routes'),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@modules/layout/layout.routes'),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
