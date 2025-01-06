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
  {
    path: 'staffs',
    loadChildren: () => import('./pages/staffs/staffs.routes'),
  },
  {
    path: 'branches',
    loadComponent: () =>
      import('./pages/branches/branches.component').then(
        (c) => c.BranchesComponent,
      ),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services.component').then(
        (c) => c.ServicesComponent,
      ),
  },

  {
    path: 'packages',
    loadComponent: () =>
      import('./pages/packages/packages.component').then(
        (c) => c.PackagesComponent,
      ),
  },
  {
    path: 'classes',
    loadComponent: () =>
      import('./pages/classes/classes.component').then(
        (c) => c.ClassesComponent,
      ),
  },
] as Routes;
