import {
  Injectable,
  Inject,
  PLATFORM_ID,
  signal,
  Signal,
  APP_INITIALIZER,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap, throwError, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { ToastService } from './toast.service';
import { Roles } from '@model/role.interface';
import { AuthUtils } from '@utils/auth.util';

@Injectable({ providedIn: 'root' })
export class AuthService {
  _authenticated = signal<boolean>(false);
  private userRoles: Roles[] = [];

  authenticated: Signal<boolean> = this._authenticated.asReadonly();

  constructor(
    private _http: HttpClient,
    private _toast: ToastService,
    @Inject(PLATFORM_ID) private platformId: Object, // Inject PLATFORM_ID
  ) {
    this.initAuthentication();
  }

  private initAuthentication(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.accessToken;
      if (token && !AuthUtils.isTokenExpired(token)) {
        this._authenticated.set(true);
      }
    }
  }

  private getLocalStorageItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  // ✅ Accessors for localStorage
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

  // ✅ Sign-in method with Content-Type header
  signIn(credentials: any): Observable<any> {
    // if (this._authenticated) {
    //   this._toast.info('User is already logged in.');
    //   return throwError(() => new Error('User is already logged in.'));
    // }

    return this._http.post(`${environment.apiUrl}auth/login`, credentials).pipe(
      switchMap((response: any) => {
        this.accessToken = response.accessToken;
        // this.role = JSON.stringify(  response.role)
        this.role = response.role.name;
        this._authenticated.set(true);
        return of(response);
      }),
    );
  }

  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this._http.get(`${environment.apiUrl}auth/signInWithToken`).pipe(
      catchError(() => {
        this.removeLocalStorageItem('accessToken');
        this.removeLocalStorageItem('role');
        this._authenticated.set(false);
        return of(false);
      }),
      switchMap((response: any) => {
        // Replace the access token with the new one if it's available on
        // the response object.
        //
        // This is an added optional step for better security. Once you sign
        // in using the token, you should generate a new one on the server
        // side and attach it to the response object. Then the following
        // piece of code can replace the token with the refreshed one.

        if (response.accessToken) {
          this.accessToken = response.accessToken;
        }

        // Set the authenticated flag to true
        this._authenticated.set(true);

        // Store the user on the user service
        // this._userService.user = response;

        // Return true
        return of(true);
      }),
    );
  }

  // ✅ Sign out method
  signOut(): Observable<any> {
    return this._http.post(`${environment.apiUrl}auth/logout`, null).pipe(
      switchMap(() => {
        this.removeLocalStorageItem('accessToken');
        this.removeLocalStorageItem('role');
        this._authenticated.set(false);
        return of(true);
      }),
    );
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
}

export function initializeAuth(
  authService: AuthService,
): () => Observable<boolean> {
  return () => authService.check();
}

// Provider for APP_INITIALIZER
export const authInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => () => {
    return authService.check().toPromise();
  },
  deps: [AuthService],
  multi: true,
};
