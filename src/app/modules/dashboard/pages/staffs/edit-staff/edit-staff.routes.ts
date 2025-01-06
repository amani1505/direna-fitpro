import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./edit-staff.component').then((c) => c.EditStaffComponent),
  },
] as Routes;
