import { OrderStatusUpdate } from './OrderStatusUpdate';

export interface OrderStatusUpdateRepository {
  update(input: OrderStatusUpdate): Promise<void>;
}