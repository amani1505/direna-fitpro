import { NgClass } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '@model/user';
import { AuthService } from '@service/auth.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'user-dashboard-pageview',
    imports: [NgClass, RouterLink, RouterLinkActive, AngularSvgIconModule, RouterOutlet],
    templateUrl: './user-dashboard-pageview.component.html',
    styleUrl: './user-dashboard-pageview.component.scss'
})
export class UserDashboardPageviewComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  user: User | null = null;

  orderCount = signal<number>(0);
  wishlistCount = signal<number>(0);
  cartItemsCount = signal<number>(0);
  firstName = signal<string>('');
  initials = signal<string>('');

  dashboardStats = computed(() => [
    {
      icon: './assets/icons/heroicons/outline/cube.svg',
      label: 'Orders',
      count: this.orderCount(),
      link: 'view order history',
      navigationLink: '/dashboard/orders',
      tone: 'bg-[#fff] text-[#17131f]',
    },
    {
      icon: './assets/icons/heroicons/outline/heart.svg',
      label: 'Wishlist',
      count: this.wishlistCount(),
      link: 'view wishlist',
      navigationLink: '/dashboard/wishlist',
      tone: 'bg-primary-500 text-white',
    },
    {
      icon: './assets/icons/heroicons/outline/shopping-cart.svg',
      label: 'In cart',
      count: this.cartItemsCount(),
      link: 'view cart',
      navigationLink: '/equipments/cart',
      tone: 'bg-secondary-400 text-white',
    },
  ]);

  dashboardLinks = [
    {
      icon: './assets/icons/heroicons/outline/chart-pie.svg',
      label: 'Overview',
      link: '/dashboard',
      exact: true,
    },
    {
      icon: './assets/icons/heroicons/outline/cube.svg',
      label: 'My orders',
      link: '/dashboard/orders',
      exact: false,
    },
    {
      icon: './assets/icons/heroicons/outline/heart.svg',
      label: 'Wishlist',
      link: '/dashboard/wishlist',
      exact: false,
    },
    {
      icon: './assets/icons/heroicons/outline/person.svg',
      label: 'Profile',
      link: '/dashboard/profile',
      exact: false,
    },
  ];

  ngOnInit() {
    this._authService.userLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        if (!loaded) return;
        const user: User | null = this._authService.user();
        this.user = user;
        this.orderCount.set(user?.ordersCount ?? 0);
        this.wishlistCount.set(user?.wishlistCount ?? 0);
        this.cartItemsCount.set(user?.cartItemsCount ?? 0);

        const profile = user?.profile;
        const first = profile?.first_name || profile?.username || '';
        this.firstName.set(first);
        this.initials.set(
          ((profile?.first_name?.[0] ?? first[0] ?? '') + (profile?.last_name?.[0] ?? '')).toUpperCase() || '✺',
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
