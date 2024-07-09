import { OrderStatus } from './OrderStatus';

export type OrderReadResult = OrdersReadResultItem[];

export interface OrdersReadResultItem {
  id: string;
  status: OrderStatus;
  items: {
    name: string;
    quantity: number;
  }[];
}