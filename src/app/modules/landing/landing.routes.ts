import { Routes } from '@angular/router';

import { LandingComponent } from './landing.component';
import { EquipmentService } from '@service/modules/equipment.service';
import { EquipmemntCategoryService } from '@service/modules/equipment-category.service';
import { CartService } from '@service/modules/cart.service';
import { AuthGuard } from '@core/guards/auth.guard';
import { AuthService } from '@service/auth.service';
import { UserService } from '@service/modules/user.service';
import { AddressService } from '@service/modules/address.service';
import { OrderService } from '@service/modules/order.service';
import { WishlistService } from '@service/modules/wishlist.service';

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
        providers: [
          EquipmentService,
          EquipmemntCategoryService,
          CartService,
          OrderService,
          WishlistService,
        ],
      },
      {
        path: 'dashboard',
        canActivateChild: [AuthGuard],
        providers: [UserService, AddressService],
        loadChildren: () =>
          import('./pages/user-dashboard/user-dashboard.routes'),
      },
    ],
  },
] as Routes;
