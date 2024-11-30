import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.routes'),
  },
  {
    path: 'members',
    loadChildren: () => import('./pages/members/members.routes'),
  },
] as Routes;
