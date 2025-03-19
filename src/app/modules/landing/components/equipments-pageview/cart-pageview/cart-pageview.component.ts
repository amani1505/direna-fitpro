import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from '@model/cart.interface';
import { CartService } from '@service/modules/cart.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: 'cart-pageview',
  standalone: true,
  imports: [NgIf, NgFor, AngularSvgIconModule],
  templateUrl: './cart-pageview.component.html',
  styleUrl: './cart-pageview.component.scss',
})
export class CartPageviewComponent implements OnInit {
  cart: Cart | null = null;
  isLoading = false;
  private _cartService = inject(CartService);
  private _router = inject(Router);
  fileUrl = environment.staicUrl;

  error = this._cartService.error;

  ngOnInit(): void {
    this._cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
  }

  get isEmpty(): boolean {
    return !this.cart || this.cart.items.length === 0;
  }

  get total(): number {
    return this._cartService.cartTotal;
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
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating item quantity', error);
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
    if (item.quantity > 1) {
      this.updateQuantity(item, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    console.log(item);
    this.isLoading = true;
    this._cartService.removeCartItem(item.id).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error removing item from cart', error);
        this.isLoading = false;
      },
    });
  }

  clearCart(): void {
    this.isLoading = true;
    this._cartService.clearCart().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error clearing cart', error);
        this.isLoading = false;
      },
    });
  }

  proceedToCheckout(): void {
    this._router.navigate(['/checkout']);
  }
}
