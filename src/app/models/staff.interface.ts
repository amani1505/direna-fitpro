import { Branch } from './branch.interface';
import { Roles } from './role.interface';

export interface Staff {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isActive: boolean;
  gender: string;
  branch: Branch;
  role: Roles;
  created_at: Date;
  updated_at: Date;
}
