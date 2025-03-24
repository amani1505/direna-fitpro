import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Cart, CartItem } from '@model/cart.interface';
import { CartService } from '@service/modules/cart.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';
import { CartLoaderComponent } from './cart-loader/cart-loader.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ToastService } from '@service/toast.service';
import { AuthService } from '@service/auth.service';
import { DropdownConfig, DropdownSection } from '@model/dropdown';
import { MenuPopupComponent } from '@components/menu-popup/menu-popup.component';

@Component({
  selector: 'cart-pageview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    CartLoaderComponent,
    CartItemComponent,
    MenuPopupComponent,
  ],
  templateUrl: './cart-pageview.component.html',
  styleUrl: './cart-pageview.component.scss',
})
export class CartPageviewComponent implements OnInit {
  cart = signal<Cart | null>(null);

  isLoading = false;
  private _cartService = inject(CartService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  fileUrl = environment.staicUrl;

  error = this._cartService.error;
  loading = this._cartService.loading;

  currentRoute: string = '';
  isAuthenticated = this._authService.authenticated;
  ngOnInit(): void {
    this._cartService.cart$.subscribe((cart) => {
      this.cart.set(cart);
    });

    this.currentRoute = this._router.url;
  }

  profileConfig: DropdownConfig = {
    triggerType: 'icon',
    width: 'w-56',
    position: 'right',
    animation: 'fade',
  };

  profileSections: DropdownSection[] = [
    {
      items: [
        {
          label: 'Profile',
          icon: './assets/icons/heroicons/outline/user-circle.svg',
          action: () => this._router.navigateByUrl(`/dashboard/profile`),
        },
        {
          label: 'Sign in',
          disabled: this.isAuthenticated(),
          icon: './assets/icons/heroicons/outline/lock-closed.svg',
          action: () =>
            this._router.navigateByUrl(`auth?redirectURL=${this.currentRoute}`),
        },
        {
          label: 'Sign out',
          icon: './assets/icons/heroicons/outline/logout.svg',
          disabled: !this.isAuthenticated(),
          action: () =>
            this._router.navigateByUrl(`signout?redirectURL=${this.currentRoute}`),
        },
      ],
    },
  ];

  get isEmpty(): boolean {
    return !this.cart || this.cart()?.items.length === 0;
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
        this._toastService.error(error.message);
        this.isLoading = false;
      },
    });
  }

  incrementQuantity(item: CartItem): void {
    if (
      item.quantity < item.equipment.quantity &&
      item.quantity < item.equipment.quantity
    ) {
      this.updateQuantity(item, item.quantity + 1);
    }
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1 || item.quantity === item.equipment.quantity) {
      this.updateQuantity(item, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.isLoading = true;
    this._cartService.removeCartItem(item.id).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this._toastService.error(error.message);
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
        this.isLoading = false;
      },
    });
  }

  proceedToCheckout(): void {
    this._router.navigate(['/checkout']);
  }
  backToShop() {
    this._router.navigate(['/equipments']);
  }
}
