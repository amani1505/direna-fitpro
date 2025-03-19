import { inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  loading: Signal<boolean> = this._loading.asReadonly();
  error: Signal<boolean> = this._error.asReadonly();

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) {
    if (this._authService.accessToken) {
      this.loadCart();
    } else {
      this._error.set(true);
    }
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
    if (!this._authService.accessToken) {
      this._error.set(true);
      console.log('Errorrrrrrr');
    }

    try {
      this._loading.set(true);
      this._http.get<Cart>(this.apiUrl).subscribe({
        next: (cart) => {
          this.cartSubject.next(cart);
          this._loading.set(false);
        },
        error: (error) => {
          // No need to handle 401 here (handled globally by interceptor)
          this._error.set(true);
          this._loading.set(false);
          if (error.status !== 401) {
            // Avoid duplicate toasts
            this._toast.error('Failed to load cart.');
          }
        },
      });
    } catch (err) {
      this._error.set(true);
      this._toast.error('Internal error loading cart.');
      this._loading.set(false);
    }
  }
  addToCart(equipmentId: string, quantity: number = 1): Observable<Cart> {
    const cartId = this.cartId;
    if (!cartId) {
      this._toast.error('Cart ID is not available');
      throw new Error('Cart ID is not available');
    }

    return this._http
      .post<Cart>(`${this.apiUrl}/${cartId}/items`, { equipmentId, quantity })
      .pipe(
        tap((cart) => {
          console.log('Add to cart', cart);
          this.cartSubject.next(cart);
          this._toast.success('Item added  successfully.');
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
          this.cartSubject.next(cart);
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
