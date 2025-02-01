import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./update-equipmemnt.component').then(
        (c) => c.UpdateEquipmemntComponent,
      ),
  },
] as Routes;
