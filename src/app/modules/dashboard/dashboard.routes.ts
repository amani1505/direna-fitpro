import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.routes'),
  },
] as Routes;
