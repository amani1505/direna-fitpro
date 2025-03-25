import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped';
}

@Component({
  selector: 'personal-dashboard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './personal-dashboard.component.html',
  styleUrl: './personal-dashboard.component.scss',
})
export class PersonalDashboardComponent {
  private readonly _router = inject(Router);
  private _route = inject(ActivatedRoute);

  recentOrders: Order[] = [
    {
      id: '18765',
      date: 'May 3, 2023',
      items: 3,
      total: 199.99,
      status: 'Delivered',
    },
    {
      id: '28765',
      date: 'May 6, 2023',
      items: 3,
      total: 299.99,
      status: 'Shipped',
    },
    {
      id: '38765',
      date: 'May 9, 2023',
      items: 3,
      total: 399.99,
      status: 'Processing',
    },
  ];

  viewOrder(orderId: string): void {
    console.log(`Viewing order: ${orderId}`);
    // Navigate to order details
  }

  viewAllOrders(): void {
    this._router.navigate(['orders'], { relativeTo: this._route });
  }
}
