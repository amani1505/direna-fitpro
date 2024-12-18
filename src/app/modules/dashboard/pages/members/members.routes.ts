import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./members.component').then((c) => c.MembersComponent),
  },
  {
    path: ':id',
    loadChildren: () => import('./view-member/view-member.routes'),
  },
  {
    path: 'add',
    loadChildren: () => import('./create-member/create-member.routes'),
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit-member/edit-member.routes'),
  },
] as Routes;
