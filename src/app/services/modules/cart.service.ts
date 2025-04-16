import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subscription,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'environments/environment';
import { Cart, CartItem } from '@model/cart.interface';
import { ToastService } from '@service/toast.service';
import { AuthService } from '@service/auth.service';

@Injectable()
export class CartService {
  private apiUrl = `${environment.apiUrl}cart`;
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();
  private _toast = inject(ToastService);
  private _loading = signal<boolean>(false);
  private _error = signal<boolean>(false);
  private _authService = inject(AuthService);

  loading: Signal<boolean> = this._loading.asReadonly();
  error: Signal<boolean> = this._error.asReadonly();

  constructor(private _http: HttpClient) {
    if (this._authService.authenticated()) {
      this.loadCart();
    }

    // ✅ Use effect() with `allowSignalWrites: true`
    effect(
      () => {
        if (this._authService.authenticated()) {
          this.loadCart(); // Load cart when user logs in
        } else {
          this.cartSubject.next(null); // Clear cart when user logs out
        }
      },
      { allowSignalWrites: true }, // ✅ This allows modifying state inside effect()
    );
  }

  get cartId(): string | null {
    const cart = this.cartSubject.getValue();
    return cart ? cart.id : null;
  }

  get cartItems(): CartItem[] {
    const cart = this.cartSubject.getValue();
    return cart ? cart.items : [];
  }

  get cartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.equipment.price * item.quantity,
      0,
    );
  }

  loadCart(): void {
    this._loading.set(true);
    this._http.get<Cart>(this.apiUrl).subscribe({
      next: (cart) => {
        this.cartSubject.next(cart);
        this._error.set(false); // ✅ Reset error only after a successful response
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(true); // ✅ Error only set if request actually fails
        this._loading.set(false);
        if (error.status !== 401) {
          this._toast.error('Failed to load cart.');
        }
      },
    });
  }

  addToCart(equipmentId: string, quantity: number = 1): Observable<Cart> {
    if (!this._authService.authenticated()) {
      return throwError(() => new Error('Login in order to manage your cart'));
    }

    const cartId = this.cartId;
    if (!cartId) {
      this._toast.error('Cart ID is not available');
      return throwError(() => new Error('Cart ID is not available'));
    }

    return this._http
      .post<Cart>(`${this.apiUrl}/${cartId}/items`, { equipmentId, quantity })
      .pipe(
        tap((cart) => {
          this.cartSubject.next({ ...cart });
          this._toast.success('Item added successfully.');
        }),
        catchError((error) => {
          return throwError(() => error.error);
        }),
      );
  }
  updateCartItem(itemId: string, quantity: number): Observable<Cart> {
    const cartId = this.cartId;
    if (!cartId) {
      this._toast.error('Cart ID is not available');
      throw new Error('Cart ID is not available');
    }

    return this._http
      .put<Cart>(`${this.apiUrl}/${cartId}/items/${itemId}`, { quantity })
      .pipe(
        tap((cart) => {
          this.cartSubject.next({ ...cart });
          this._toast.success('Item updated successfully.');
        }),
      );
  }

  removeCartItem(itemId: string): Observable<Cart> {
    const cartId = this.cartId;
    if (!cartId) {
      this._toast.error('Cart ID is not available');
      throw new Error('Cart ID is not available');
    }

    return this._http
      .delete<Cart>(`${this.apiUrl}/${cartId}/items/${itemId}`)
      .pipe(
        tap((cart) => {
          this.cartSubject.next(cart);
          this._toast.success('Item removed successfully.');
        }),
      );
  }

  clearCart(): Observable<void> {
    const cartId = this.cartId;
    if (!cartId) {
      this._toast.error('Cart ID is not available');
      throw new Error('Cart ID is not available');
    }

    return this._http.delete<void>(`${this.apiUrl}/${cartId}`).pipe(
      tap(() => {
        const currentCart = this.cartSubject.getValue();
        if (currentCart) {
          this.cartSubject.next({
            ...currentCart,
            items: [],
          });
        }
        this._toast.success('Cart was cleared successfully.');
      }),
    );
  }
}
