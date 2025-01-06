import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./view-staff.component').then((c) => c.ViewStaffComponent),
  },
] as Routes;
