import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { RoleGuard } from '@core/guards/role.guard';
// import { provideState } from '@ngrx/store';
// import { app_reducer } from 'app/shared/store/app.reducer';

export default [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    loadChildren: () => import('../dashboard/dashboard.routes'),
    // providers: [provideState({ name: 'app_state', reducer: app_reducer })],
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // { path: '**', redirectTo: 'error/404' },
] as Routes;
