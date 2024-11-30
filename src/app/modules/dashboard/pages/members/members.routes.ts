import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./members.component').then((c) => c.MembersComponent),
  },
] as Routes;
