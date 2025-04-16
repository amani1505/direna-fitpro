import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Wishlist } from '@model/wishlist.interface';
import { AuthService } from '@service/auth.service';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class WishlistService {
  private apiUrl = `${environment.apiUrl}wishlist`;
  private wishlistSubject = new BehaviorSubject<Wishlist[] | []>([]);
  public wishlist$ = this.wishlistSubject.asObservable();
  private _toast = inject(ToastService);
  private _loading = signal<boolean>(false);
  private _error = signal<boolean>(false);
  private _authService = inject(AuthService);

  loading: Signal<boolean> = this._loading.asReadonly();
  error: Signal<boolean> = this._error.asReadonly();

  constructor(private _http: HttpClient) {
    if (this._authService.authenticated()) {
      this.loadWishlist();
    }

    effect(
      () => {
        if (this._authService.authenticated()) {
          this.loadWishlist(); // Load cart when user logs in
        } else {
          this.wishlistSubject.next(null); // Clear cart when user logs out
        }
      },
      { allowSignalWrites: true }, // ✅ This allows modifying state inside effect()
    );
  }

  loadWishlist(): void {
    this._loading.set(true);
    this._http.get<Wishlist[]>(`${this.apiUrl}/mine`).subscribe({
      next: (wishlist) => {
        this.wishlistSubject.next(wishlist);
        this._error.set(false); // ✅ Reset error only after a successful response
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(true); // ✅ Error only set if request actually fails
        this._loading.set(false);
        if (error.status !== 401) {
          this._toast.error('Failed to load Wishlist.');
        }
      },
    });
  }

  addToWishlist(equipmentId: string): Observable<Wishlist> {
    if (!this._authService.authenticated()) {
      return throwError(
        () => new Error('Login in order to manage your wishlist'),
      );
    }
    return this._http
      .post<Wishlist>(this.apiUrl, { equipment_id: equipmentId })
      .pipe(
        tap((wishlist) => {
          const currentWishlist = this.wishlistSubject.getValue();
          this.wishlistSubject.next([...currentWishlist, wishlist]);
        }),
        catchError((error) => {
          return throwError(() => error.error);
        }),
      );
  }

  removeFromWishlist(wishlistId: string): Observable<Wishlist> {
    if (!wishlistId) {
      this._toast.error('Wishlist ID is not available');
      throw new Error('Wishlist ID is not available');
    }

    return this._http.delete<Wishlist>(`${this.apiUrl}/${wishlistId}`).pipe(
      tap(
        () => {
          const currentWishlist = this.wishlistSubject.getValue();
          const updatedWishlist = currentWishlist.filter((item:Wishlist) => item.id !== wishlistId);
          this.wishlistSubject.next(updatedWishlist);
        },

        catchError((error) => {
          return throwError(() => error.error);
        }),
      ),
    );
  }
}
