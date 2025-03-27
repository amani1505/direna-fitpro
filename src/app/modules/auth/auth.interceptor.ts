import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '@service/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const injector = inject(Injector);
  const platformId = inject(PLATFORM_ID);

  // Get token from localStorage directly (only in browser)
  let accessToken: string | null = null;
  if (isPlatformBrowser(platformId)) {
    accessToken = localStorage.getItem('accessToken');
  }

  // Clone the request with auth header if token exists
  let newReq = req.clone();
  if (accessToken) {
    newReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${accessToken}`)
        .set('X-XSRF-TOKEN', getCookie('XSRF-TOKEN') || '') // CSRF token for protected routes
    });
  }

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const authService = injector.get(AuthService);
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            if (newToken) {
              const retriedReq = req.clone({
                headers: req.headers
                  .set('Authorization', `Bearer ${newToken}`)
                  .set('X-XSRF-TOKEN', getCookie('XSRF-TOKEN') || '')
              });
              return next(retriedReq);
            }
            return throwError(() => error);
          }),
          catchError(() => {
            authService.signOut().subscribe();
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  }
  return null;
}
