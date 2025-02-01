import { Routes } from '@angular/router';

export default [
  {
    path: '',
    data: { title: 'Equipments' },
    loadComponent: () =>
      import('./equipments.component').then((c) => c.EquipmentsComponent),
  },
  {
    path: 'add',
    data: { title: 'Add Equipment' },
    loadChildren: () => import('./create-equipmemnt/create-equipment.routes'),
  },
  {
    path: ':id',
    data: { title: 'View Equipment' },
    loadChildren: () => import('./view-equipmemnt/view-equipment.routes'),
  },

  {
    path: 'edit/:id',
    data: { title: 'Edit Member' },
    loadChildren: () => import('./update-equipmemnt/update-equipment.routes'),
  },
] as Routes;
