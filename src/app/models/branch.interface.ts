import { Member } from './member.interface';

export interface Branch {
  id: string;
  city: string;
  country: string;
  street: string;
  district: string;
  house_no: string;
  road: string;
  members: Array<Member>;
  created_at: Date;
  updated_at: Date;
}
