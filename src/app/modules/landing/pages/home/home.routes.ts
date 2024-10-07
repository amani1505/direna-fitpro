import { Routes } from '@angular/router';
import { NotFoundComponent } from '@components/error/not-found/not-found.component';
import { HomeComponent } from './home.component';

export default [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
] as Routes;
