import { Routes } from '@angular/router';

export default [
  {
    path: '',
    data: { title: 'Classes' },
    loadComponent: () =>
      import('./classes.component').then((c) => c.ClassesComponent),
  },
  {
    path: 'add',
    data: { title: 'Add Class' },
    loadChildren: () => import('./create-class/create-class.routes'),
  },
  {
    path: ':id',
    data: { title: 'View Class' },
    loadChildren: () => import('./view-class/view-class.routes'),
  },

  {
    path: 'edit/:id',
    data: { title: 'Edit Member' },
    loadChildren: () => import('./update-class/update-class.routes'),
  },
] as Routes;
