import { Branch } from './branch.interface';

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
  created_at: Date;
  updated_at: Date;
}
