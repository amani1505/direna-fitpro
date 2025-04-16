import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { EquipmentsHeaderComponent } from '../equipments-header/equipments-header.component';
import { EquipmentsCardComponent } from '../equipments-card/equipments-card.component';
import { Equipment } from '@model/equipment';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '@components/paginations/pagination/pagination.component';
import { CartService } from '@service/modules/cart.service';
import { Cart } from '@model/cart.interface';
import { ToastService } from '@service/toast.service';
import { WishlistService } from '@service/modules/wishlist.service';
import { Wishlist } from '@model/wishlist.interface';

@Component({
  selector: 'equipments',
  standalone: true,
  imports: [
    EquipmentsHeaderComponent,
    EquipmentsCardComponent,
    PaginationComponent,
  ],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {
  @Input({ required: true }) data: Equipment[] = [];
  @Input({ required: true }) isLoading: boolean = false;
  @Input({ required: true }) totalPages = 1;
  @Input({ required: true }) currentPage = 1;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<'DESC' | 'ASC'>();

  private _cartService = inject(CartService);
  private _wishlistService = inject(WishlistService);
  private _toastService = inject(ToastService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  cart = signal<Cart | null>(null);
  wishlist = signal<Wishlist | null>(null);

  view(id: any) {
    this._router.navigate([id], { relativeTo: this._route });
  }

  addToCart(id: string) {
    this._cartService.addToCart(id, 1).subscribe({
      next: (cart) => {
        this.cart.set(cart);
      },
      error: (error) => {
        this._toastService.error(error.message);
      },
    });
  }

  addToWishlist(id: string) {
    this._wishlistService.addToWishlist(id).subscribe({
      next: (wishlist) => {
        this.wishlist.set(wishlist);
      },
      error: (error) => {
        this._toastService.error(error.message);
      },
    });
  }

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }
  onItemCountChange(event: number) {
    this.itemsCountChange.emit(event);
  }

  onSortChange(event: 'DESC' | 'ASC') {
    this.sortChange.emit(event);
  }
}
