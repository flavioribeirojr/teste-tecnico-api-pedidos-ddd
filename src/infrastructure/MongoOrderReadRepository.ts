import { OrdersReadResultItem } from '../domain/OrderReadResult';
import { OrdersReadRepository } from '../domain/OrdersReadRepository';
import { Order } from './MongoSchema';

export class MongoOrderReadRepository implements OrdersReadRepository {
  async getAll(): Promise<OrdersReadResultItem[]> {
    const orders = await Order.find();

    return orders.map(order => ({
      id: order._id.toString(),
      status: order.status,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
      })),
    }));
  }
}