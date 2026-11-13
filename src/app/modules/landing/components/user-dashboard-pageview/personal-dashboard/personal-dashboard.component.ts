import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '@model/order.interface';
import { AuthService } from '@service/auth.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Subject, takeUntil } from 'rxjs';
import { itemCount, statusTone } from '../order-view';

@Component({
  selector: 'personal-dashboard',
  imports: [NgClass, DatePipe, DecimalPipe, RouterLink, AngularSvgIconModule],
  templateUrl: './personal-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './personal-dashboard.component.scss',
})
export class PersonalDashboardComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  orderHistory = signal<Order[]>([]);
  recentOrders = computed(() => this.orderHistory().slice(0, 5));
  loading = signal<boolean>(true);

  readonly tone = statusTone;
  readonly count = itemCount;

  ngOnInit() {
    this._authService.userLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        if (!loaded) return;
        this.orderHistory.set(this._authService.user()?.orderHistory ?? []);
        this.loading.set(false);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
