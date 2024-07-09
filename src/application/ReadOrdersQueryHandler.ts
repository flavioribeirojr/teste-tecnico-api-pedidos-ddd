import { OrderReadQuery } from '../domain/cqrs/query/OrderReadQuery';
import { OrderReadResult } from '../domain/OrderReadResult';
import { QueryHandler } from '../domain/cqrs/query/QueryHandler';
import { OrdersReader } from './OrdersReader';

export class ReadOrdersQueryHandler implements QueryHandler<OrderReadQuery, OrderReadResult> {
  public query = OrderReadQuery.name;

  constructor(private ordersReader: OrdersReader) {}

  async handle() {
    const orders = await this.ordersReader.read();

    return orders;
  }
}