import { Branch } from './branch.interface';
import { Equipment } from './equipment';
import { Member, Staff } from './member.interface';
import { Services } from './services.interface';

export interface CountData {
  title: string;
  subtitle: string;
  icon: string;
  count: number;
  link: string;
}

export interface DashboardData {
  counts: CountData[];
  latestBranches: Branch[];
  latestServices: Services[];
  latestStaffs: Staff[];
  latestMembers: Member[];
  latestEquipments: Equipment[];
}
