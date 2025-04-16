import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Wishlist } from '@model/wishlist.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: 'wishlist-card',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './wishlist-card.component.html',
  styleUrl: './wishlist-card.component.scss',
})
export class WishlistCardComponent {
  @Input() wishlist: Wishlist;
  fileUrl = environment.staicUrl;

  @Output() removeFromWishlist = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<string>();

  onRemovwFromWishlist(equipmentId: string): void {
    this.removeFromWishlist.emit(equipmentId);
  }
  onAddToCart(equipmentId: string): void {
    this.addToCart.emit(equipmentId);
  }
}
