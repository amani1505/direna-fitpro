import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Wishlist } from '@model/wishlist.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
    selector: 'wishlist-card',
    imports: [AngularSvgIconModule, DecimalPipe],
    templateUrl: './wishlist-card.component.html',
    styleUrl: './wishlist-card.component.scss'
})
export class WishlistCardComponent {
  @Input() wishlist: Wishlist;
  fileUrl = environment.staicUrl;

  @Output() removeFromWishlist = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<string>();

  get image(): string | undefined {
    return this.wishlist?.equipment?.files?.[0]?.file_path;
  }

  onRemovwFromWishlist(wishlistId: string): void {
    this.removeFromWishlist.emit(wishlistId);
  }

  onAddToCart(equipmentId: string): void {
    this.addToCart.emit(equipmentId);
  }
}
