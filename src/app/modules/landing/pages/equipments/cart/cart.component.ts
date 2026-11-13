import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CartPageviewComponent } from '@modules/landing/components/equipments-pageview/cart-pageview/cart-pageview.component';

@Component({
  selector: 'app-cart',
  imports: [CartPageviewComponent],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
