import { Member, Staff } from './member.interface';
import { Roles } from './role.interface';

export interface User {
  profile: Profile;
}

export interface Profile {
  id: string;
  avatar?: string;
  username: string;
  email: string;
  // blog: Array<Blog>;
  role: Roles;
  member?: Member;
  staff?: Staff;
  created_at: Date;
  updated_at: Date;
}
