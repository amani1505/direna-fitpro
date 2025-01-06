import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./create-staff.component').then((c) => c.CreateStaffComponent),
  },
] as Routes;
