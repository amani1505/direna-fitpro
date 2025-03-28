// import {
//   Injectable,
//   Inject,
//   PLATFORM_ID,
//   signal,
//   Signal,
//   APP_INITIALIZER,
//   OnDestroy,
// } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {
//   Observable,
//   of,
//   switchMap,
//   throwError,
//   catchError,
//   BehaviorSubject,
// } from 'rxjs';
// import { environment } from 'environments/environment';
// import { AuthUtils } from '@utils/auth.util';
// import { User } from '@model/user';

// @Injectable({ providedIn: 'root' })
// export class AuthService implements OnDestroy {
//   _authenticated = signal<boolean>(false);
//   private _user = signal<User | null>(null);
//   private _userLoadedSubject = new BehaviorSubject<boolean>(false);

//   authenticated: Signal<boolean> = this._authenticated.asReadonly();
//   user: Signal<User | null> = this._user.asReadonly();
//   userLoaded$ = this._userLoadedSubject.asObservable();

//   constructor(
//     private _http: HttpClient,
//     @Inject(PLATFORM_ID) private _platformId: Object, // Inject PLATFORM_ID
//   ) {
//     this.initAuthentication();
//   }

//   ngOnDestroy(): void {
//     this._userLoadedSubject.complete();
//   }

//   // private initAuthentication(): void {
//   //   if (isPlatformBrowser(this._platformId)) {
//   //     const token = this.accessToken;
//   //     if (token && !AuthUtils.isTokenExpired(token)) {
//   //       this._authenticated.set(true);
//   //     }
//   //   }
//   // }

//   private initAuthentication(): void {
//     if (isPlatformBrowser(this._platformId)) {
//       const token = this.accessToken;
//       if (token && !AuthUtils.isTokenExpired(token)) {
//         this._authenticated.set(true);
//         // Immediately load user profile when a valid token is found
//         this.loadUserProfile();
//       }
//     }
//   }
//   private getLocalStorageItem(key: string): string | null {
//     if (isPlatformBrowser(this._platformId)) {
//       return localStorage.getItem(key);
//     }
//     return null;
//   }

//   private setLocalStorageItem(key: string, value: string): void {
//     if (isPlatformBrowser(this._platformId)) {
//       localStorage.setItem(key, value);
//     }
//   }

//   private removeLocalStorageItem(key: string): void {
//     if (isPlatformBrowser(this._platformId)) {
//       localStorage.removeItem(key);
//     }
//   }

//   // ✅ Accessors for localStorage
//   set accessToken(token: string) {
//     this.setLocalStorageItem('accessToken', token);
//     this._authenticated.set(!!token);
//   }

//   get accessToken(): string {
//     return this.getLocalStorageItem('accessToken') ?? '';
//   }

//   set role(role: string) {
//     this.setLocalStorageItem('role', role);
//   }

//   get role(): string {
//     return this.getLocalStorageItem('role') ?? '';
//   }

//   // get user() {
//   //   return this._user();
//   // }

//   // ✅ Sign-in method with Content-Type header
//   signIn(credentials: any): Observable<any> {
//     // if (this._authenticated) {
//     //   this._toast.info('User is already logged in.');
//     //   return throwError(() => new Error('User is already logged in.'));
//     // }

//     return this._http.post(`${environment.apiUrl}auth/login`, credentials).pipe(
//       switchMap((response: any) => {
//         this.accessToken = response.accessToken;
//         // this.role = JSON.stringify(  response.role)

//         this.role = response.user.role.name;
//         this._authenticated.set(true);
//         this.loadUserProfile();
//         return of(response);
//       }),
//     );
//   }

//   signInUsingToken(): Observable<any> {
//     // Sign in using the token
//     return this._http.get(`${environment.apiUrl}auth/signInWithToken`).pipe(
//       catchError(() => {
//         this.removeLocalStorageItem('accessToken');
//         this.removeLocalStorageItem('role');
//         this._authenticated.set(false);
//         this._userLoadedSubject.next(false);
//         return of(false);
//       }),
//       switchMap((response: any) => {
//         // Replace the access token with the new one if it's available on
//         // the response object.
//         //
//         // This is an added optional step for better security. Once you sign
//         // in using the token, you should generate a new one on the server
//         // side and attach it to the response object. Then the following
//         // piece of code can replace the token with the refreshed one.

//         if (response.accessToken) {
//           this.accessToken = response.accessToken;
//         }

//         // Set the authenticated flag to true
//         this._authenticated.set(true);
//         this.loadUserProfile();
//         // Store the user on the user service
//         // this._userService.user = response;

//         // Return true
//         return of(true);
//       }),
//     );
//   }

//   private loadUserProfile(): void {
//     if (!this._authenticated()) return;

//     this._http
//       .get<User>(`${environment.apiUrl}me`)
//       .pipe(
//         catchError((error) => {
//           console.error('Failed to load user profile', error);
//           this._userLoadedSubject.next(false);
//           return of(null);
//         }),
//       )
//       .subscribe((user) => {
//         if (user) {
//           this._user.set(user);
//           this._userLoadedSubject.next(true);
//         }
//       });
//   }

//   // ✅ Sign out method
//   signOut(): Observable<any> {
//     return this._http.post(`${environment.apiUrl}auth/logout`, null).pipe(
//       switchMap(() => {
//         this.removeLocalStorageItem('accessToken');
//         this.removeLocalStorageItem('role');
//         this._authenticated.set(false);
//         this._user.set(null);
//         this._userLoadedSubject.next(false);
//         return of(true);
//       }),
//     );
//   }

//   check(): Observable<boolean> {
//     // First check if we already know the user is authenticated
//     if (this._authenticated()) return of(true);

//     // Then check if we have a token that's not expired
//     if (!this.accessToken) return of(false);
//     if (AuthUtils.isTokenExpired(this.accessToken)) return of(false);

//     // If we have a valid token but _authenticated is false, update it
//     this._authenticated.set(true);

//     // Optionally, verify the token with the server
//     return this.signInUsingToken();
//   }
// }

// export function initializeAuth(
//   authService: AuthService,
// ): () => Observable<boolean> {
//   return () => authService.check();
// }

// // Provider for APP_INITIALIZER
// export const authInitializerProvider = {
//   provide: APP_INITIALIZER,
//   useFactory: (authService: AuthService) => () => {
//     return authService.check().toPromise();
//   },
//   deps: [AuthService],
//   multi: true,
// };

import {
  Injectable,
  Inject,
  PLATFORM_ID,
  signal,
  Signal,
  APP_INITIALIZER,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  of,
  switchMap,
  BehaviorSubject,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'environments/environment';
import { AuthUtils } from '@utils/auth.util';
import { User } from '@model/user';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  _authenticated = signal<boolean>(false);
  private _user = signal<User | null>(null);
  private _userLoadedSubject = new BehaviorSubject<boolean>(false);
  private _toastService = inject(ToastService);
  private _updatePasswordLoading = signal<boolean>(false);



  authenticated: Signal<boolean> = this._authenticated.asReadonly();
  user: Signal<User | null> = this._user.asReadonly();
  userLoaded$ = this._userLoadedSubject.asObservable();
  updatePasswordLoading: Signal<boolean> = this._updatePasswordLoading.asReadonly();

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) {
    this.initAuthentication();
  }

  private initAuthentication(): void {
    if (isPlatformBrowser(this._platformId)) {
      const token = this.accessToken;
      if (token && !AuthUtils.isTokenExpired(token)) {
        this._authenticated.set(true);
        this.loadUserProfile();
      }
    }
  }

  private getLocalStorageItem(key: string): string | null {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem(key);
    }
  }

  set accessToken(token: string) {
    this.setLocalStorageItem('accessToken', token);
    this._authenticated.set(!!token);
  }

  get accessToken(): string {
    return this.getLocalStorageItem('accessToken') ?? '';
  }

  set role(role: string) {
    this.setLocalStorageItem('role', role);
  }

  get role(): string {
    return this.getLocalStorageItem('role') ?? '';
  }

  signIn(credentials: any): Observable<any> {
    // if (this._authenticated) {
    //   this._toast.info('User is already logged in.');
    //   return throwError(() => new Error('User is already logged in.'));
    // }

    return this._http.post(`${environment.apiUrl}auth/login`, credentials).pipe(
      switchMap((response: any) => {
        this.accessToken = response.accessToken;
        // this.role = JSON.stringify(  response.role)

        this.role = response.user.role.name;
        this._authenticated.set(true);
        this.loadUserProfile();
        return of(response);
      }),
    );
  }
  refreshToken(): Observable<string | null> {
    return this._http
      .post<{
        accessToken: string;
      }>(`${environment.apiUrl}auth/refresh-token`, {})
      .pipe(
        map((response) => {
          if (response.accessToken) {
            this.accessToken = response.accessToken;
            return response.accessToken;
          }
          return null;
        }),
        catchError((error) => {
          this._toastService.error(`Token refresh failed: ${error}`);
          this.signOut();
          return of(null);
        }),
      );
  }

  updatePassword(data: {
    password: string;
    newPassword: string;
  }): Observable<any> {
    this._updatePasswordLoading.set(true);

    return this._http.post<any>(`${environment.apiUrl}auth/change-password`, data).pipe(
      tap((response) => {
        this._toastService.success('Password successfuly updated.');
        this._updatePasswordLoading.set(false);
      }),
      catchError((error) => {
      
        this._updatePasswordLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  signOut(): Observable<any> {
    return this._http.post(`${environment.apiUrl}auth/logout`, null).pipe(
      switchMap(() => {
        this.removeLocalStorageItem('accessToken');
        this.removeLocalStorageItem('role');
        this._authenticated.set(false);
        this._user.set(null);
        this._userLoadedSubject.next(false);
        return of(true);
      }),
      catchError(() => {
        // Fallback logout if server call fails
        this.removeLocalStorageItem('accessToken');
        this.removeLocalStorageItem('role');
        this._authenticated.set(false);
        this._user.set(null);
        this._userLoadedSubject.next(false);
        return of(true);
      }),
    );
  }

  private loadUserProfile(): void {
    if (!this._authenticated()) return;

    this._http
      .get<User>(`${environment.apiUrl}me`)
      .pipe(
        catchError((error) => {
          this._toastService.error(`Failed to load user profile: ${error}`);
          this._userLoadedSubject.next(false);
          return of(null);
        }),
      )
      .subscribe((user) => {
        if (user) {
          this._user.set(user);
          this._userLoadedSubject.next(true);
        }
      });
  }

  check(): Observable<boolean> {
    // First check if we already know the user is authenticated
    if (this._authenticated()) return of(true);

    // Then check if we have a token that's not expired
    if (!this.accessToken) return of(false);
    if (AuthUtils.isTokenExpired(this.accessToken)) return of(false);

    // If we have a valid token but _authenticated is false, update it
    this._authenticated.set(true);

    // Optionally, verify the token with the server
    return this.signInUsingToken();
  }

  signInUsingToken(): Observable<any> {
    return this._http.get(`${environment.apiUrl}auth/signInWithToken`).pipe(
      catchError(() => {
        this.removeLocalStorageItem('accessToken');
        this.removeLocalStorageItem('role');
        this._authenticated.set(false);
        this._userLoadedSubject.next(false);
        return of(false);
      }),
      switchMap((response: any) => {
        if (response.accessToken) {
          this.accessToken = response.accessToken;
        }

        this._authenticated.set(true);
        this.loadUserProfile();
        return of(true);
      }),
    );
  }
}

export function initializeAuth(
  authService: AuthService,
): () => Observable<boolean> {
  return () => authService.check();
}

export const authInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => () => {
    return authService.check().toPromise();
  },
  deps: [AuthService],
  multi: true,
};
