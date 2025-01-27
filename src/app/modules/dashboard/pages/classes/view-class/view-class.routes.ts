import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./view-class.component').then((c) => c.ViewClassComponent),
  },
] as Routes;
