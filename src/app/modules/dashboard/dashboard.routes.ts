import { Routes } from '@angular/router';
import { BranchesService } from '@service/modules/branches.service';
import { ClassesService } from '@service/modules/classes.service';
import { EquipmemntCategoryService } from '@service/modules/equipment-category.service';
import { EquipmentService } from '@service/modules/equipment.service';
import { MemberService } from '@service/modules/member.service';
import { RolesService } from '@service/modules/roles.service';
import { ServicesService } from '@service/modules/services.service';
import { StaffService } from '@service/modules/staff.service';

export default [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.routes'),
  },
  {
    path: 'members',
    loadChildren: () => import('./pages/members/members.routes'),
    providers: [MemberService, BranchesService, ServicesService],
  },
  {
    path: 'staffs',
    loadChildren: () => import('./pages/staffs/staffs.routes'),
    providers: [BranchesService, RolesService, StaffService],
  },
  {
    path: 'branches',
    loadComponent: () =>
      import('./pages/branches/branches.component').then(
        (c) => c.BranchesComponent,
      ),
    providers: [BranchesService],
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services.component').then(
        (c) => c.ServicesComponent,
      ),
    providers: [ServicesService],
  },
  {
    path: 'equipments',
    loadChildren: () => import('./pages/equipments/equipments.routes'),
    providers: [EquipmemntCategoryService,EquipmentService],
  },

  {
    path: 'packages',
    loadComponent: () =>
      import('./pages/packages/packages.component').then(
        (c) => c.PackagesComponent,
      ),
  },
  {
    path: 'classes',
    loadChildren: () => import('./pages/classes/classes.routes'),
    providers: [ClassesService, StaffService],
  },
] as Routes;
