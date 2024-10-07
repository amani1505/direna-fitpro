import { Routes } from '@angular/router';
import { NotFoundComponent } from '@components/error/not-found/not-found.component';
import { LandingComponent } from './landing.component';

export default [
  {
    path: '',
    component: LandingComponent,
    loadChildren: () => import('./pages/home/home.routes'),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
] as Routes;
