import { Routes } from '@angular/router';

export default [
  {
    path: '',
    data: { title: 'Members' },
    loadComponent: () =>
      import('./staffs.component').then((c) => c.StaffsComponent),
  },
  {
    path: 'add',
    data: { title: 'Add Staff' },
    loadChildren: () => import('./create-staff/create-staff.routes'),
  },
  {
    path: ':id',
    data: { title: 'View Staff' },
    loadChildren: () => import('./view-staff/view-staff.routes'),
  },

  {
    path: 'edit/:id',
    data: { title: 'Edit Staff' },
    loadChildren: () => import('./edit-staff/edit-staff.routes'),
  },
] as Routes;
