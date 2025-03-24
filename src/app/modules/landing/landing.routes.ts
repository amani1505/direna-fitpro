import { Routes } from '@angular/router';

import { LandingComponent } from './landing.component';
import { EquipmentService } from '@service/modules/equipment.service';
import { EquipmemntCategoryService } from '@service/modules/equipment-category.service';
import { CartService } from '@service/modules/cart.service';

export default [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.routes'),
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about/about.routes'),
      },
      {
        path: 'blog',
        loadChildren: () => import('./pages/blog/blog.routes'),
      },
      {
        path: 'contact-us',
        loadChildren: () => import('./pages/contact-us/contact-us.routes'),
      },
      {
        path: 'equipments',
        loadChildren: () => import('./pages/equipments/equipments.routes'),
        providers: [EquipmentService, EquipmemntCategoryService, CartService],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/user-dashboard/user-dashboard.routes'),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/user-dashboard/profile/profile.routes'),
      },
    ],
  },
] as Routes;
