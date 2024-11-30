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
          icon: 'assets/icons/heroicons/solid/user-group.svg',
          label: 'members',
          route: '/admin/members',
          // children: [
          //   {
          //     icon: 'assets/icons/heroicons/solid/users.svg',
          //     label: 'New Member',
          //     route: '/admin/members/add-member',
          //   },
          //   {
          //     icon: 'assets/icons/heroicons/solid/users.svg',
          //     label: 'Members',
          //     route: '/admin/members',
          //   },
          // ],
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
          icon: 'assets/icons/heroicons/solid/users.svg',
          label: 'staffs',
          route: '/admin/staffs',
        },
        {
          icon: 'assets/icons/heroicons/solid/swatch.svg',
          label: 'Equipments',
          route: '/admin/equipments',
        },

        {
          icon: 'assets/icons/heroicons/solid/banknotes.svg',
          label: 'financial overview',
          route: '/admin/financials/expenses',
          children: [
            {
              label: 'expense',
              route: '/admin/financials/expense',
            },
            {
              label: 'revenue',
              route: '/admin/financials/revenue',
            },
          ],
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
