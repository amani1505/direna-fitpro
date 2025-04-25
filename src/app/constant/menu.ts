import { MenuItem } from '@model/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      items: [
        {
          icon: 'assets/icons/heroicons/solid/chart-pie.svg',
          label: 'Dashboard',
          roles: ['Super Admin'],
          route: '/admin/',
        },
        {
          icon: 'assets/icons/heroicons/solid/building-office-2.svg',
          label: 'Branches',
          roles: ['Super Admin'],
          route: '/admin/branches',
        },
        {
          icon: 'assets/icons/heroicons/solid/wrench-screwdriver.svg',
          label: 'Services',
          roles: ['Super Admin'],
          route: '/admin/services',
        },

        {
          icon: 'assets/icons/heroicons/solid/user-group.svg',
          label: 'members',
          roles: ['Super Admin'],
          route: '/admin/members',
        },
        {
          icon: 'assets/icons/heroicons/solid/users.svg',
          label: 'staffs',
          roles: ['Super Admin'],
          route: '/admin/staffs',
        },
        {
          icon: 'assets/icons/heroicons/solid/briefcase.svg',
          label: 'Packages',
          roles: ['Super Admin'],
          route: '/admin/packages',
        },
        {
          icon: 'assets/icons/heroicons/solid/calender-days.svg',
          label: 'Classes',
          roles: ['Super Admin'],
          route: '/admin/classes',
        },

        {
          icon: 'assets/icons/heroicons/solid/swatch.svg',
          label: 'Equipments',
          roles: ['Super Admin'],
          route: '/admin/equipments',
        },

        {
          icon: 'assets/icons/heroicons/solid/banknotes.svg',
          label: 'expense',
          roles: ['Super Admin'],
          route: '/admin/financials/expenses',
        },
        {
          icon: 'assets/icons/heroicons/solid/chart-bar-square.svg',
          label: 'Analytics and Reports',
          roles: ['Super Admin'],
          route: '/admin/financials/reports',
        },
        {
          icon: 'assets/icons/heroicons/solid/user-circle.svg',
          label: 'profile',
          roles: ['Super Admin'],
          route: '/admin/profile',
        },
      ],
    },
  ];
}
