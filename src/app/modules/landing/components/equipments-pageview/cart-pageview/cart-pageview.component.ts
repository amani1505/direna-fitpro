import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Cart, CartItem } from '@model/cart.interface';
import { CartService } from '@service/modules/cart.service';
import { OrderService } from '@service/modules/order.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartLoaderComponent } from './cart-loader/cart-loader.component';

@Component({
  selector: 'cart-pageview',
  standalone: true,
  imports: [RouterLink, DecimalPipe, AngularSvgIconModule, CartLoaderComponent, CartItemComponent],
  templateUrl: './cart-pageview.component.html',
  styleUrl: './cart-pageview.component.scss',
})
export class CartPageviewComponent implements OnInit {
  cart = signal<Cart | null>(null);
  isLoading = false;
  private _cartService = inject(CartService);
  private _orderService = inject(OrderService);
  private _toastService = inject(ToastService);
  private _destroyRef = inject(DestroyRef);

  loading = this._cartService.loading;
  orderLoading = this._orderService.loading;

  ngOnInit(): void {
    this._cartService.loadCart();
    this._cartService.cart$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((cart) => this.cart.set(cart));
  }

  get isEmpty(): boolean {
    return !this.cart()?.items?.length;
  }

  get total(): number {
    return this._cartService.cartTotal;
  }

  /** Units across all lines (2 × dumbbells + 1 mat = 3). */
  get unitCount(): number {
    return (this.cart()?.items ?? []).reduce((sum, item) => sum + (item.quantity || 0), 0);
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(item);
      return;
    }
    if (quantity > item.equipment.quantity) {
      quantity = item.equipment.quantity;
    }
    this.isLoading = true;
    this._cartService.updateCartItem(item.id, quantity).subscribe({
      next: () => (this.isLoading = false),
      error: (error) => {
        this._toastService.error(error?.error?.message || error.message);
        this.isLoading = false;
      },
    });
  }

  incrementQuantity(item: CartItem): void {
    if (item.quantity < item.equipment.quantity) {
      this.updateQuantity(item, item.quantity + 1);
    }
  }

  decrementQuantity(item: CartItem): void {
    this.updateQuantity(item, item.quantity - 1);
  }

  removeItem(item: CartItem): void {
    this.isLoading = true;
    this._cartService.removeCartItem(item.id).subscribe({
      next: () => (this.isLoading = false),
      error: (error) => {
        this._toastService.error(error?.error?.message || error.message);
        this.isLoading = false;
      },
    });
  }

  createOrder(cartId: string) {
    this._orderService.create(cartId).subscribe({
      next: () => {
        this._toastService.success('Order placed. You can follow it in your dashboard.');
        this._cartService.loadCart();
      },
      error: (error) => {
        this._toastService.error(error?.error?.message || "Couldn't place the order. Try again.");
      },
    });
  }
}
