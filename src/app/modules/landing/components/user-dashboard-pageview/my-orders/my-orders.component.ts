import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '@components/modal/modal.component';
import { OrderService } from '@service/modules/order.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OrdersCardComponent } from './orders-card/orders-card.component';
import { OrdersTableRowComponent } from './orders-table-row/orders-table-row.component';

@Component({
    selector: 'app-my-orders',
    imports: [OrdersTableRowComponent, OrdersCardComponent, ModalComponent, RouterLink, AngularSvgIconModule],
    templateUrl: './my-orders.component.html',
    styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  private _ordersService = inject(OrderService);
  private _toast = inject(ToastService);

  myOrders = computed(() => this._ordersService.orders() || []);
  loading = this._ordersService.loading;

  /** Order waiting for the person to confirm the cancellation. */
  cancelId = signal<string | null>(null);
  cancelling = signal(false);
  readonly cancelContent = "The order will be cancelled and won't be delivered.";
  readonly cancelNote = "This can't be undone. To get the items later, place a new order.";

  ngOnInit() {
    this._ordersService.getUserOrders();
  }

  askCancel(orderId: string): void {
    this.cancelId.set(orderId);
  }

  confirmCancel(): void {
    const id = this.cancelId();
    if (!id || this.cancelling()) return;
    this.cancelling.set(true);
    this._ordersService.cancelOrder(id).subscribe({
      next: () => {
        this._toast.success('Order cancelled.');
        this.cancelling.set(false);
        this.cancelId.set(null);
      },
      error: (error) => {
        this._toast.error(error?.error?.message || 'Couldn\'t cancel the order. Try again.');
        this.cancelling.set(false);
      },
    });
  }
}
