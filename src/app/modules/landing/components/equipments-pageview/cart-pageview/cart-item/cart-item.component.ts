import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: '[cart-item]',
  standalone: true,
  imports: [AngularSvgIconModule, RouterModule, CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() set product(value: any) {
    this._product.set(value); // ✅ Convert the input into a signal
  }
  private _product: WritableSignal<any> = signal<any>({});

  @Output() decrementQuantity: EventEmitter<any> = new EventEmitter();
  @Output() incrementQuantity: EventEmitter<any> = new EventEmitter();
  @Output() removeItem: EventEmitter<any> = new EventEmitter();

  quatity = 0;
  available = 12;
  fileUrl = environment.staicUrl;

  get product() {
    return this._product(); // ✅ Read signal value
  }

  onIncrement(item: any) {
    this.incrementQuantity.emit(item);
  }

  onDecrement(item: any) {
    this.decrementQuantity.emit(item);
  }

  onRemove(item: any) {
    this.removeItem.emit(item);
  }
}
