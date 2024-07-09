import { OrderReadResult } from './OrderReadResult';

export interface OrdersReadRepository {
  getAll(): Promise<OrderReadResult>;
}