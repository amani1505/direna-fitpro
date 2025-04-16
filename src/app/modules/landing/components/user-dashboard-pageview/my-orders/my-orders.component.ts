import { Component, computed, inject, OnInit } from '@angular/core';
import { OrdersTableRowComponent } from './orders-table-row/orders-table-row.component';
import { OrdersCardComponent } from './orders-card/orders-card.component';
import { OrderService } from '@service/modules/order.service';
import { ToastService } from '@service/toast.service';
interface Order {
  id: string;
  date: string;
  amount: number;
  status: string;
  image: string;
}

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [OrdersTableRowComponent, OrdersCardComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent implements OnInit {
  private _ordersService = inject(OrderService);
  private _toast = inject(ToastService);

  myOrders = computed(() => this._ordersService.orders() || []);

  loading = this._ordersService.loading;

  ngOnInit() {
    this._ordersService.getUserOrders();
  }

  onDeleteOrder(orderId: string): void {
    this._ordersService.cancelOrder(orderId).subscribe({
      next: () => {
        this._toast.success('Order canceled successfully.');
      },
      error: (error) => {
        this._toast.error(error.error.message || 'Failed to cancel the order.');
      },
    });
  }
}
