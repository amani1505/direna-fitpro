import { Routes } from '@angular/router';
import { BranchesService } from '@service/modules/branches.service';
import { ClassesService } from '@service/modules/classes.service';
import { DashboardService } from '@service/modules/dashboard.service';
import { EquipmemntCategoryService } from '@service/modules/equipment-category.service';
import { EquipmentService } from '@service/modules/equipment.service';
import { MemberService } from '@service/modules/member.service';
import { RolesService } from '@service/modules/roles.service';
import { ServicesService } from '@service/modules/services.service';
import { StaffService } from '@service/modules/staff.service';

export default [
  {
    path: '',
    providers:[DashboardService],
    data: { roles: ['Super Admin'] },
    loadChildren: () => import('./pages/home/home.routes'),
  },
  {
    path: 'members',
    data: { roles: ['Super Admin'] },
    loadChildren: () => import('./pages/members/members.routes'),
    providers: [MemberService, BranchesService, ServicesService],
  },
  {
    path: 'staffs',
    data: { roles: ['Super Admin'] },
    loadChildren: () => import('./pages/staffs/staffs.routes'),
    providers: [BranchesService, RolesService, StaffService],
  },
  {
    path: 'branches',
    data: { roles: ['Super Admin'] },
    loadComponent: () =>
      import('./pages/branches/branches.component').then(
        (c) => c.BranchesComponent,
      ),
    providers: [BranchesService],
  },
  {
    path: 'services',
    data: { roles: ['Super Admin'] },
    loadComponent: () =>
      import('./pages/services/services.component').then(
        (c) => c.ServicesComponent,
      ),
    providers: [ServicesService],
  },
  {
    path: 'equipments',
    data: { roles: ['Super Admin'] },
    loadChildren: () => import('./pages/equipments/equipments.routes'),
    providers: [EquipmemntCategoryService,EquipmentService],
  },

  {
    path: 'packages',
    data: { roles: ['Super Admin'] },
    loadComponent: () =>
      import('./pages/packages/packages.component').then(
        (c) => c.PackagesComponent,
      ),
  },
  {
    path: 'classes',
    data: { roles: ['Super Admin'] },
    loadChildren: () => import('./pages/classes/classes.routes'),
    providers: [ClassesService, StaffService],
  },
] as Routes;
