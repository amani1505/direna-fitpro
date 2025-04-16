import { NgClass, NgIf } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User } from '@model/user';
import { AuthService } from '@service/auth.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-dashboard-pageview',
  standalone: true,
  imports: [NgIf, NgClass, RouterModule, AngularSvgIconModule, RouterOutlet],
  templateUrl: './user-dashboard-pageview.component.html',
  styleUrl: './user-dashboard-pageview.component.scss',
})
export class UserDashboardPageviewComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  user: User | null = null;

  orderCount = signal<number>(0);
  wishlistCount = signal<number>(0);
  cartItemsCount = signal<number>(0);

  dashboardStats = computed(() => [
    {
      icon: './assets/icons/heroicons/outline/cube.svg',
      label: 'Orders',
      count: this.orderCount(),
      link: 'View order history',
      navigationLink: '/dashboard/orders',
    },
    {
      icon: './assets/icons/heroicons/outline/heart.svg',
      label: 'Wishlist',
      count: this.wishlistCount(),
      link: 'View wishlist',
      navigationLink: '/dashboard/wishlist',
    },
    {
      icon: './assets/icons/heroicons/outline/clock.svg',
      label: 'Cart',
      count: this.cartItemsCount(),
      link: 'View Cart',
      navigationLink: '/equipments/cart',
    },
  ]);
  dashboardLinks = [
    {
      icon: './assets/icons/heroicons/outline/chart-pie.svg',
      label: 'Dashboard',
      link: '/dashboard',
    },
    {
      icon: './assets/icons/heroicons/outline/cube.svg',
      label: 'My Orders',
      link: '/dashboard/orders',
    },
    {
      icon: './assets/icons/heroicons/outline/person.svg',
      label: 'Profile',
      link: '/dashboard/profile',
    },
    {
      icon: './assets/icons/heroicons/outline/heart.svg',
      label: 'Wishlist',
      link: '/dashboard/wishlist',
    },
    // {
    //   icon: './assets/icons/heroicons/outline/cog-8-tooth.svg',
    //   label: 'Account Settings',
    //   link: '/orders',
    // },
  ];

  ngOnInit() {
    // Subscribe to user loaded status
    this._authService.userLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        if (loaded) {
          this.user = this._authService.user();

          this.orderCount.set(this._authService.user().ordersCount);
          this.wishlistCount.set(this._authService.user().wishlistCount);
          this.cartItemsCount.set(this._authService.user().cartItemsCount);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
