import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '@model/cart.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: '[cart-item]',
  standalone: true,
  imports: [AngularSvgIconModule, RouterLink, DecimalPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input({ required: true }) product!: CartItem;
  /** Disables the controls while a cart update is in flight. */
  @Input() busy = false;

  @Output() decrementQuantity = new EventEmitter<CartItem>();
  @Output() incrementQuantity = new EventEmitter<CartItem>();
  @Output() removeItem = new EventEmitter<CartItem>();

  fileUrl = environment.staicUrl;

  onIncrement(item: CartItem) {
    this.incrementQuantity.emit(item);
  }

  onDecrement(item: CartItem) {
    this.decrementQuantity.emit(item);
  }

  onRemove(item: CartItem) {
    this.removeItem.emit(item);
  }
}
