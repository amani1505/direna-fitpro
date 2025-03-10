import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap, throwError, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { ToastService } from './toast.service';
import { Roles } from '@model/role.interface';
import { AuthUtils } from '@utils/auth.util';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated: boolean = false;
  private userRoles: Roles[] = [];

  constructor(
    private _http: HttpClient,
    private _toast: ToastService,
    @Inject(PLATFORM_ID) private platformId: Object, // Inject PLATFORM_ID
  ) {}

  // ✅ Safely access localStorage only in the browser
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

    return this._http.post(`${environment.apiUrl}auth/login`, credentials, { withCredentials: true }).pipe(
      switchMap((response: any) => {
        this.accessToken = response.accessToken;
        // this.role = JSON.stringify(  response.role)
        this.role = response.role.name;


        this._authenticated = true;
        return of(response);
      }),
    );
  }

  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this._http.get(`${environment.apiUrl}auth/signInWithToken`).pipe(
      catchError(() =>
        // Return false
        of(false),
      ),
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
        this._authenticated = true;

        // Store the user on the user service
        // this._userService.user = response;

        // Return true
        return of(true);
      }),
    );
  }

  // ✅ Sign out method
  signOut(): Observable<any> {
    this.removeLocalStorageItem('accessToken');
    this.removeLocalStorageItem('role');
    this._authenticated = false;
    return of(true);
  }

  // ✅ Check if user is authenticated
  check(): Observable<boolean> {
    if (this._authenticated) return of(true);
    if (!this.accessToken) return of(false);
    if (AuthUtils.isTokenExpired(this.accessToken)) return of(false);
    return this.signInUsingToken();
  }
}
