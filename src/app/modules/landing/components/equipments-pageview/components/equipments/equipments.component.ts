import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '@components/paginations/pagination/pagination.component';
import { Equipment } from '@model/equipment';
import { AuthService } from '@service/auth.service';
import { CartService } from '@service/modules/cart.service';
import { WishlistService } from '@service/modules/wishlist.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router } from '@angular/router';
import { EquipmentsCardComponent } from '../equipments-card/equipments-card.component';

@Component({
  selector: 'equipments',
  imports: [EquipmentsCardComponent, PaginationComponent, AngularSvgIconModule],
  templateUrl: './equipments.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {
  @Input({ required: true }) data: Equipment[] = [];
  @Input({ required: true }) isLoading = false;
  @Input({ required: true }) totalPages = 1;
  @Input({ required: true }) currentPage = 1;
  @Input() totalItems = 0;
  /** True when a search or category is applied. */
  @Input() filtered = false;
  @Output() pageChange = new EventEmitter<number>();
  @Output() clearFilters = new EventEmitter<void>();

  private _cartService = inject(CartService);
  private _wishlistService = inject(WishlistService);
  private _toastService = inject(ToastService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  private readonly wishlist = toSignal(this._wishlistService.wishlist$, {
    initialValue: null,
  });
  /** Equipment ids already in the wishlist, so their hearts show filled. */
  readonly wishlistIds = computed(
    () =>
      new Set(
        (this.wishlist() ?? [])
          .map((item) => item.equipment?.id)
          .filter(Boolean),
      ),
  );

  /** Cart and wishlist need an account; send guests to sign in first. */
  private requireSignIn(): boolean {
    if (this._authService.authenticated()) return false;
    this._toastService.error(
      'Sign in to save items and add them to your cart.',
    );
    this._router.navigate(['/auth'], {
      queryParams: { redirectURL: this._router.url },
    });
    return true;
  }

  addToCart(id: string) {
    if (this.requireSignIn()) return;
    this._cartService.addToCart(id, 1).subscribe({
      next: () => this._toastService.success('Added to your cart.'),
      error: (error) =>
        this._toastService.error(error?.error?.message || error.message),
    });
  }

  addToWishlist(id: string) {
    if (this.requireSignIn()) return;
    if (this.wishlistIds().has(id)) {
      this._toastService.success('Already in your wishlist.');
      return;
    }
    this._wishlistService.addToWishlist(id).subscribe({
      next: () => this._toastService.success('Saved to your wishlist.'),
      error: (error) =>
        this._toastService.error(error?.error?.message || error.message),
    });
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
