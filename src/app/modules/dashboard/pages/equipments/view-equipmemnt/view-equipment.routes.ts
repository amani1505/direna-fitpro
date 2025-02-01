import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./view-equipmemnt.component').then(
        (c) => c.ViewEquipmemntComponent,
      ),
  },
] as Routes;
