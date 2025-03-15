import { Routes } from '@angular/router';
import { EquipmentsPageviewComponent } from '@modules/landing/components/equipments-pageview/equipments-pageview.component';
import { EquipmentsComponent } from './equipments.component';

export default [
  {
    path: '',
    component: EquipmentsComponent,
    children: [
      {
        path: '',

        loadComponent: () =>
          import(
            '../../components/equipments-pageview/equipments-pageview.component'
          ).then((c) => c.EquipmentsPageviewComponent),
      },
      {
        path: ':id',
        data: { title: 'View Equipment' },
        loadChildren: () => import('./view-single/view-single.routes'),
      },
    ],
  },
] as Routes;
