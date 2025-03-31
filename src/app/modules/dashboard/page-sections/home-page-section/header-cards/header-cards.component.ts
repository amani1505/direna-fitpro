import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'header-cards',
  standalone: true,
  imports: [AngularSvgIconModule,NgClass,RouterModule ],
  templateUrl: './header-cards.component.html',
  styleUrl: './header-cards.component.scss',
})
export class HeaderCardsComponent {
  dashboardStats = [
    {
      icon: '/assets/icons/heroicons/solid/building-office-2.svg',
      label: 'Banches',
      subtitle: 'Branches Registerd',
      count: 5,
      navigationLink: '/admin/branches',
    },
    {
      icon: './assets/icons/heroicons/solid/wrench-screwdriver.svg',
      label: 'Services',
      count: 12,
      subtitle: 'Services provided',
      navigationLink: '/admin/services',
    },
    {
      icon: './assets/icons/heroicons/solid/user-group.svg',
      label: 'Members',
      count: 8,
      subtitle: 'All Platform Members',
      navigationLink: '/admin/members',
    },

    {
      icon: './assets/icons/heroicons/solid/users.svg',
      label: 'Staffs',
      count: 2,
      subtitle: 'All Platform Staffs',
      navigationLink: '/admin/staffs',
    },
    {
      icon: './assets/icons/heroicons/solid/swatch.svg',
      label: 'Equipments',
      count: 3,
      subtitle: 'All Platform Equipments',
      navigationLink: '/admin/equipments',
    },
  ];
}
