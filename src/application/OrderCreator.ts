import { OrderCreation } from '../domain/OrderCreation';
import { OrderCreatorRepository } from '../domain/OrderCreationRepository';

export class OrderCreator {
  constructor(private orderCreatorRepository: OrderCreatorRepository) {}

  async create(orderCreation: OrderCreation) {
    const order = await this.orderCreatorRepository.create(orderCreation);

    return order;
  }
}