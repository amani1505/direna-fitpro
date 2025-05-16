import { Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { OrderService } from '@service/modules/order.service';
import { WishlistService } from '@service/modules/wishlist.service';
import { CartService } from '@service/modules/cart.service';

export default [
  {
    path: '',
    component: UserDashboardComponent,
    children: [
      {
        path: '',
        data: { roles: ['User'] },
        loadComponent: () =>
          import(
            '@modules/landing/components//user-dashboard-pageview/personal-dashboard/personal-dashboard.component'
          ).then((c) => c.PersonalDashboardComponent),
      },
      {
        path: 'orders',
        providers: [OrderService],
        data: { roles: ['User'] },
        loadComponent: () =>
          import(
            '@modules/landing/components//user-dashboard-pageview/my-orders/my-orders.component'
          ).then((c) => c.MyOrdersComponent),
      },

      {
        path: 'profile',
        data: { roles: ['User'] },
        loadChildren: () => import('./profile/profile.routes'),
      },
      {
        path: 'wishlist',
        providers: [WishlistService, CartService],
        data: { roles: ['User'] },
        loadComponent: () =>
          import(
            '@modules/landing/components//user-dashboard-pageview/my-wishlist/my-wishlist.component'
          ).then((c) => c.MyWishlistComponent),
      },
    ],
  },
] as Routes;
