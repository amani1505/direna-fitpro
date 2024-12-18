import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./view-member.component').then((c) => c.ViewMemberComponent),
  },
] as Routes;
