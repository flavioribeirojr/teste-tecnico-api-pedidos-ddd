import { OrderNotFoundError } from '../domain/OrderNotFoundError';
import { OrderStatusUpdate } from '../domain/OrderStatusUpdate';
import { OrderStatusUpdateRepository } from '../domain/OrderStatusUpdateRepository';
import { Order } from './MongoSchema';

export class MongoOrderStatusUpdateRepository implements OrderStatusUpdateRepository {
  async update(orderStatusUpdate: OrderStatusUpdate): Promise<void> {
    const order = await Order.findById(orderStatusUpdate.orderId);

    if (!order) {
      throw new OrderNotFoundError(orderStatusUpdate.orderId);
    }

    order.status = orderStatusUpdate.status;
    await order.save();
  }
}