import { Component, computed, inject, OnInit } from '@angular/core';
import { OrdersTableRowComponent } from "./orders-table-row/orders-table-row.component";
import { OrdersCardComponent } from "./orders-card/orders-card.component";
import { OrderService } from '@service/modules/order.service';
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

  myOrders = computed(() => this._ordersService.orders() || []);



  orders: Order[] = [
    {
      id: '#ORD-5288',
      date: 'June 10, 2023',
      amount: 129.0,
      status: 'Processing',
      image: 'https://picsum.photos/200/200?random=1',
    },
    {
      id: '#ORD-5287',
      date: 'June 05, 2023',
      amount: 189.99,
      status: 'Delivered',
      image: 'https://picsum.photos/200/200?random=2',
    },
    {
      id: '#ORD-5286',
      date: 'May 28, 2023',
      amount: 79.99,
      status: 'Cancelled',
      image: 'https://picsum.photos/200/200?random=3',
    },
    {
      id: '#ORD-5285',
      date: 'May 22, 2023',
      amount: 349.99,
      status: 'Delivered',
      image: 'https://picsum.photos/200/200?random=4',
    },
  ];
  ngOnInit() {
this._ordersService.getUserOrders()
  }
}
