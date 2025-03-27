// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandlerFn,
//   HttpRequest,
// } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '@service/auth.service';

// import { catchError, Observable, throwError } from 'rxjs';

// /**
//  * Intercept
//  *
//  * @param req
//  * @param next
//  */
// export const authInterceptor = (
//   req: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<unknown>> => {
//   const authService = inject(AuthService);
//   // Clone the request object
//   let newReq = req.clone();

//   // Request
//   //
//   // If the access token didn't expire, add the Authorization header.
//   // We won't add the Authorization header if the access token expired.
//   // This will force the server to return a "401 Unauthorized" response
//   // for the protected API routes which our response interceptor will
//   // catch and delete the access token from the local storage while logging
//   // the user out from the app.
//   if (authService.accessToken) {
//     newReq = req.clone({
//       headers: req.headers.set(
//         'Authorization',
//         'Bearer ' + authService.accessToken
//       ),
//     });
//   }

//   // Response
//   return next(newReq).pipe(
//     catchError((error) => {

//          // Catch "401 Unauthorized" responses
//       if (error instanceof HttpErrorResponse && error.status === 401) {
//         // Sign out
//         authService.signOut();

//         // Reload the app
//         location.reload();
//       }

//       return throwError(error);
//     })
//   );
// };

import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const platformId = inject(PLATFORM_ID);

  // Helper function to safely get localStorage item
  const getLocalStorageItem = (key: string): string | null => {
    if (isPlatformBrowser(platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  };

  // Helper function to safely remove localStorage item
  const removeLocalStorageItem = (key: string): void => {
    if (isPlatformBrowser(platformId)) {
      localStorage.removeItem(key);
    }
  };

  // Get token from localStorage directly
  const accessToken = getLocalStorageItem('accessToken');

  // Clone the request object
  let newReq = req.clone();

  // Add Authorization header if token exists
  if (accessToken) {
    newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + accessToken
      ),
    });
  }

  // Response handling
  return next(newReq).pipe(
    catchError((error) => {
      // Catch "401 Unauthorized" responses
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Clear authentication state
        removeLocalStorageItem('accessToken');
        removeLocalStorageItem('role');

        // Reload the app (only on browser)
        if (isPlatformBrowser(platformId)) {
          window.location.reload();
        }
      }

      return throwError(() => error);
    })
  );
};
