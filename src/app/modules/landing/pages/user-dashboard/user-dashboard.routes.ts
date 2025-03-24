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
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes'),
      },
    ],
  },
] as Routes;
