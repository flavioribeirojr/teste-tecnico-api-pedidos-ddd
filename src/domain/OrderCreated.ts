import { OrderStatus } from './OrderStatus';

export interface OrderCreated {
  id: string;
  status: OrderStatus;
  items: {
    name: string;
    quantity: number;
  }[];
}