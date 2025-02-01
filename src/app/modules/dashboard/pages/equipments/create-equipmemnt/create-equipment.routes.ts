import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./create-equipmemnt.component').then((c) => c.CreateEquipmemntComponent),
  },
] as Routes;
