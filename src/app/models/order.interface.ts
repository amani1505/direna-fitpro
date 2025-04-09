import { Equipment } from './equipment';
import { User } from './user';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderItem {
  id: string;
  order: Order;
  equipment: Equipment;
  quantity: number;
  price: number;
  created_at: Date;
}

export interface Order {
  id: string;
  order_number: string;
  user: User;
  total_amount: number;
  status: OrderStatus;
  shipping_address: string;
  payment_method: string;
  items: OrderItem[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateOrderRequest {
  shipping_address: string;
  payment_method: string;
}
