import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { BranchesService } from '@service/modules/branches.service';
import { ServicesService } from '@service/modules/services.service';

export default [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./sign-in/sign-in.component').then((m) => m.SignInComponent),
      },
      {
        path: 'sign-up',
        providers: [BranchesService, ServicesService],
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
    ],
  },
] as Routes;
