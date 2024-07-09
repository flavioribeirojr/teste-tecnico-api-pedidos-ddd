import { OrderStatus } from './OrderStatus';

export interface OrderStatusUpdate {
  orderId: string;
  status: Exclude<OrderStatus, 'pendente'>
}