import { Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';

export default [
  {
    path: '',
    component: UserDashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '@modules/landing/components//user-dashboard-pageview/personal-dashboard/personal-dashboard.component'
          ).then((c) => c.PersonalDashboardComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import(
            '@modules/landing/components//user-dashboard-pageview/my-orders/my-orders.component'
          ).then((c) => c.MyOrdersComponent),
      },

      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes'),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import(
            '@modules/landing/components//user-dashboard-pageview/my-wishlist/my-wishlist.component'
          ).then((c) => c.MyWishlistComponent),
      },
    ],
  },
] as Routes;
