import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'user-dashboard-pageview',
  standalone: true,
  imports: [NgIf, NgClass, RouterModule, AngularSvgIconModule, RouterOutlet],
  templateUrl: './user-dashboard-pageview.component.html',
  styleUrl: './user-dashboard-pageview.component.scss',
})
export class UserDashboardPageviewComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  dashboardStats = [
    {
      icon: './assets/icons/heroicons/outline/cube.svg',
      label: 'Orders',
      count: 5,
      link: 'View order history',
      navigationLink: '/dashboard/orders',
    },
    {
      icon: './assets/icons/heroicons/outline/heart.svg',
      label: 'Wishlist',
      count: 12,
      link: 'View wishlist',
      navigationLink: '/dashboard/wishlist',
    },
    {
      icon: './assets/icons/heroicons/outline/clock.svg',
      label: 'Recently Viewed',
      count: 8,
      link: 'See all',
      navigationLink: '/dashboard/orders',
    },
  ];

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
}
