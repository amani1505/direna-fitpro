import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./create-class.component').then((c) => c.CreateClassComponent),
  },
] as Routes;
