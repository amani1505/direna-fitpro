import { Routes } from '@angular/router';

export default [
  {
    path: '',
    data: { title: 'Members' },
    loadComponent: () =>
      import('./members.component').then((c) => c.MembersComponent),
  },
  {
    path: 'add',
    data: { title: 'Add Member' },
    loadChildren: () => import('./create-member/create-member.routes'),
  },
  {
    path: ':id',
    data: { title: 'View Member' },
    loadChildren: () => import('./view-member/view-member.routes'),
  },

  {
    path: 'edit/:id',
    data: { title: 'Edit Member' },
    loadChildren: () => import('./edit-member/edit-member.routes'),
  },
] as Routes;
