import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Order } from '@model/order.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';
import { canCancel, itemCount, orderThumbs, statusTone } from '../../order-view';

@Component({
    selector: '[orders-table-row]',
    imports: [AngularSvgIconModule, DatePipe, DecimalPipe, NgClass],
    templateUrl: './orders-table-row.component.html',
    styleUrl: './orders-table-row.component.scss'
})
export class OrdersTableRowComponent implements OnChanges {
  @Input() order: Order;
  @Output() cancelOrder = new EventEmitter<string>();

  fileUrl = environment.staicUrl;
  thumbs: { images: string[]; more: number } = { images: [], more: 0 };
  units = 0;
  tone = '';
  cancellable = false;

  ngOnChanges(): void {
    if (!this.order) return;
    this.thumbs = orderThumbs(this.order);
    this.units = itemCount(this.order);
    this.tone = statusTone(this.order.status);
    this.cancellable = canCancel(this.order);
  }

  onDeleteOrder(orderId: string): void {
    this.cancelOrder.emit(orderId);
  }
}
