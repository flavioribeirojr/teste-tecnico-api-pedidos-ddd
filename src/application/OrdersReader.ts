import { OrdersReadRepository } from '../domain/OrdersReadRepository';

export class OrdersReader {
  constructor(private ordersReadRepository: OrdersReadRepository) {}

  async read() {
    const orders = await this.ordersReadRepository.getAll();

    return orders;
  }
}