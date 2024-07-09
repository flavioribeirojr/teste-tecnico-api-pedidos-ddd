import { OrderCreated } from '../domain/OrderCreated';
import { OrderCreation } from '../domain/OrderCreation';
import { OrderCreatorRepository } from '../domain/OrderCreationRepository';
import { Order } from './MongoSchema';

export class MongoOrderCreatorRepository implements OrderCreatorRepository {
  async create(orderCreation: OrderCreation): Promise<OrderCreated> {
    const order = new Order({
      status: 'pendente',
    });

    order.items = orderCreation.items;
    const result = await order.save();

    return {
      id: result._id.toString(),
      status: result.status,
      items: result.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
      })),
    };
  }
}