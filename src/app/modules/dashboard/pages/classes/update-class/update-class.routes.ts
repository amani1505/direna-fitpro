import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./update-class.component').then((c) => c.UpdateClassComponent),
  },
] as Routes;
