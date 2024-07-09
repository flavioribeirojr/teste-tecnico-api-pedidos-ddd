import { OrderCreated } from './OrderCreated';
import { OrderCreation } from './OrderCreation';

export interface OrderCreatorRepository {
  create(orderCreation: OrderCreation): Promise<OrderCreated>;
}