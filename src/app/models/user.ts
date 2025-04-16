import { Member, Staff } from './member.interface';
import { Order } from './order.interface';
import { Roles } from './role.interface';

export interface User {
  profile: Profile;
  ordersCount: number;
  wishlistCount: number;
  cartItemsCount: number;
  orderHistory: Order[];
}

export interface Profile {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  avatar?: string;
  username: string;u
  phone_number: string;
  gender: string;
  email: string;

  // blog: Array<Blog>;
  role: Roles;
  member?: Member;
  staff?: Staff;
  created_at: Date;
  updated_at: Date;
}
