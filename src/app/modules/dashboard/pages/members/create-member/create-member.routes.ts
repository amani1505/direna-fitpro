import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./create-member.component').then((c) => c.CreateMemberComponent),
  },
] as Routes;
