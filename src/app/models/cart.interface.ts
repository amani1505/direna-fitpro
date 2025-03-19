import { Equipment } from './equipment';

export interface CartItem {
  id: string;
  equipment: Equipment;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}
