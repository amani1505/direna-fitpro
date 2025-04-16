import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '@model/order.interface';
import { User } from '@model/user';
import { AuthService } from '@service/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'personal-dashboard',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './personal-dashboard.component.html',
  styleUrl: './personal-dashboard.component.scss',
})
export class PersonalDashboardComponent implements OnInit, OnDestroy {
  private readonly _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  user: User | null = null;
  orderHistory = signal<Order[]>([]);
  loading = signal<boolean>(false);

  ngOnInit() {
    // Subscribe to user loaded status
    this._authService.userLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        this.loading.set(true);
        if (loaded) {
          this.user = this._authService.user();

          this.orderHistory.set(this._authService.user().orderHistory);

          this.loading.set(false);
        }
      });
  }

  viewOrder(orderId: string): void {
    console.log(`Viewing order: ${orderId}`);
    // Navigate to order details
  }

  viewAllOrders(): void {
    this._router.navigate(['orders'], { relativeTo: this._route });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
