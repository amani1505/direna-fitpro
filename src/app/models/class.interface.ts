import { Member, Staff } from './member.interface';

export interface Class {
  id: string;
  name: string;
  category: string;
  time: string;
  instractor: Staff;
  max_participants: number;
  member: Member;
  dayOfWeek: string;
  created_at: Date;
  updated_at: Date;
}
