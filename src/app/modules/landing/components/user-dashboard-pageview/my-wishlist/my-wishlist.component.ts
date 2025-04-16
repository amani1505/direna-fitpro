import { NgFor } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { WishlistCardComponent } from './wishlist-card/wishlist-card.component';
import { WishlistService } from '@service/modules/wishlist.service';
import { Wishlist } from '@model/wishlist.interface';
import { ToastService } from '@service/toast.service';
import { CartService } from '@service/modules/cart.service';
@Component({
  selector: 'app-my-wishlist',
  standalone: true,
  imports: [WishlistCardComponent],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.scss',
})
export class MyWishlistComponent implements OnInit {
  wishlists = signal<Wishlist[] | []>([]);
  private _wishlistService = inject(WishlistService);
  private _toastService = inject(ToastService);
  private _cartService = inject(CartService);

  loading = this._wishlistService.loading;

  ngOnInit(): void {
    this._wishlistService.loadWishlist();
    this._wishlistService.wishlist$.subscribe((wishlist) => {
    console.log(wishlist);
      this.wishlists.set(wishlist);
    });

  }

  addToCart(id: string) {
    this._cartService.addToCart(id, 1).subscribe({
      next: (cart) => {
        this._toastService.success('Item added successfully.');
      },
      error: (error) => {
        this._toastService.error(error.message);
      },
    });
  }

  removeFromWishlist(equipmentId: string) {
    this._wishlistService.removeFromWishlist(equipmentId).subscribe({
      next: () => {
        this._toastService.success('Item removed from wishlist successfully.');
      },
      error: (error) => {
        this._toastService.error(error.message);
      },
    });
  }
}
