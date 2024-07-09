import { OrderStatusUpdate } from '../domain/OrderStatusUpdate';
import { OrderStatusUpdateRepository } from '../domain/OrderStatusUpdateRepository';

export class OrderStatusUpdater {
  constructor(private orderStatusUpdateRepository: OrderStatusUpdateRepository) {}

  async update(orderStatusUpdate: OrderStatusUpdate) {
    await this.orderStatusUpdateRepository.update(orderStatusUpdate);
  }
}