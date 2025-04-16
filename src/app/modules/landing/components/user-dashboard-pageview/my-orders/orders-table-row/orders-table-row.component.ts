import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '@model/order.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: '[orders-table-row]',
  standalone: true,
  imports: [AngularSvgIconModule, DatePipe],
  templateUrl: './orders-table-row.component.html',
  styleUrl: './orders-table-row.component.scss',
})
export class OrdersTableRowComponent {
  @Input() order: Order;
  fileUrl = environment.staicUrl;

  @Output() cancelOrder = new EventEmitter<string>();

  onDeleteOrder(orderId: string): void {
    this.cancelOrder.emit(orderId);
  }
}
