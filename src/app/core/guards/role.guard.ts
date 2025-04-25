import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { of } from 'rxjs';

export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get the expected roles from route data
  const expectedRoles = route.data?.['roles'] as string[];

  // Get the user's role from AuthService
  const userRole = authService.role;

  // If no role or user is not authenticated, redirect to auth
  if (!userRole) {
    return of(router.createUrlTree(['/auth']));
  }

  // Check if the user's role is in the expected roles
  if (expectedRoles && expectedRoles.includes(userRole)) {
    return of(true); // Allow access
  }

  // Redirect based on role
  if (userRole === 'User') {
    return of(router.createUrlTree(['/dashboard']));
  } else {
    // All other roles (Super Admin, Trainer, Staff, Accountant, etc.) go to /admin
    return of(router.createUrlTree(['/admin']));
  }
};
