import { Equipment } from './equipment';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderItem {
  id: number;
  equipment: Equipment;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  total_amount: number;
  status: OrderStatus;
  shipping_address: string;
  payment_method: string;
  items: OrderItem[];
  created_at: Date;
}

export interface CreateOrderRequest {
  shipping_address: string;
  payment_method: string;
}
