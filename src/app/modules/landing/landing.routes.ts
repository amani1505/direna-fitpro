import { Routes } from '@angular/router';
import { NotFoundComponent } from '@components/error/not-found/not-found.component';
import { LandingComponent } from './landing.component';
import path from 'path';

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
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
] as Routes;
