import { MenuItem } from '@model/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      items: [
        {
          icon: 'assets/icons/heroicons/solid/chart-pie.svg',
          label: 'Dashboard',
          route: '/admin/',
        },
        {
          icon: 'assets/icons/heroicons/solid/building-office-2.svg',
          label: 'Branches',
          route: '/admin/branches',
        },
        {
          icon: 'assets/icons/heroicons/solid/wrench-screwdriver.svg',
          label: 'Services',
          route: '/admin/services',
        },

        {
          icon: 'assets/icons/heroicons/solid/user-group.svg',
          label: 'members',
          route: '/admin/members',
        },
        {
          icon: 'assets/icons/heroicons/solid/users.svg',
          label: 'staffs',
          route: '/admin/staffs',
        },
        {
          icon: 'assets/icons/heroicons/solid/briefcase.svg',
          label: 'Packages',
          route: '/admin/packages',
        },
        {
          icon: 'assets/icons/heroicons/solid/calender-days.svg',
          label: 'Classes',
          route: '/admin/classes',
        },

        {
          icon: 'assets/icons/heroicons/solid/swatch.svg',
          label: 'Equipments',
          route: '/admin/equipments',
        },

        {
          icon: 'assets/icons/heroicons/solid/banknotes.svg',
          label: 'expense',
          route: '/admin/financials/expenses',
        },
        {
          icon: 'assets/icons/heroicons/solid/chart-bar-square.svg',
          label: 'Analytics and Reports',
          route: '/admin/financials/reports',
        },
        {
          icon: 'assets/icons/heroicons/solid/user-circle.svg',
          label: 'profile',
          route: '/admin/profile',
        },
      ],
    },
  ];
}
