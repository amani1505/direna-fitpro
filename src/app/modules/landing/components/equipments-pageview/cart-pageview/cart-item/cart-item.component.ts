import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: '[cart-item]',
  standalone: true,
  imports: [AngularSvgIconModule,CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() product = <any>{};
  quatity: number = 0;
  available: number = 12;

  add() {
    if (this.available > this.quatity) {
      ++this.quatity;
    }
  }
  decrease() {
    if (this.quatity > 0) {
      --this.quatity;
    }
  }
}
