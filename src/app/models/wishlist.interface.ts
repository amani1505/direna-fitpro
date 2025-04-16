import { Equipment } from './equipment';
import { User } from './user';

export interface Wishlist {
  id: string;
  equipment: Equipment;
  user: User;
  created_at: Date;
  updated_at: Date;
}
