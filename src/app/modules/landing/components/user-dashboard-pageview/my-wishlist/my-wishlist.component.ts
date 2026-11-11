import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Wishlist } from '@model/wishlist.interface';
import { CartService } from '@service/modules/cart.service';
import { WishlistService } from '@service/modules/wishlist.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { WishlistCardComponent } from './wishlist-card/wishlist-card.component';

@Component({
    selector: 'app-my-wishlist',
    imports: [WishlistCardComponent, RouterLink, AngularSvgIconModule],
    templateUrl: './my-wishlist.component.html',
    styleUrl: './my-wishlist.component.scss'
})
export class MyWishlistComponent implements OnInit {
  private _wishlistService = inject(WishlistService);
  private _toastService = inject(ToastService);
  private _cartService = inject(CartService);
  private _destroyRef = inject(DestroyRef);

  wishlists = signal<Wishlist[]>([]);
  loading = this._wishlistService.loading;

  ngOnInit(): void {
    this._wishlistService.loadWishlist();
    this._wishlistService.wishlist$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((wishlist) => this.wishlists.set(wishlist ?? []));
  }

  addToCart(id: string) {
    this._cartService.addToCart(id, 1).subscribe({
      next: () => this._toastService.success('Added to your cart.'),
      error: (error) => this._toastService.error(error.message),
    });
  }

  removeFromWishlist(wishlistId: string) {
    this._wishlistService.removeFromWishlist(wishlistId).subscribe({
      next: () => this._toastService.success('Removed from your wishlist.'),
      error: (error) => this._toastService.error(error.message),
    });
  }
}
