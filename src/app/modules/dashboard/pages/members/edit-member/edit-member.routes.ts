import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./edit-member.component').then((c) => c.EditMemberComponent),
  },
] as Routes;
