import { OrdersReader } from '../../src/application/OrdersReader';
import { randomUUID } from 'node:crypto';
import { OrdersReadResultItem } from '../../src/domain/OrderReadResult';

describe('OrdersReader', () => {
  it('must resolve a list of orders', async () => {
    const fakeOrders: OrdersReadResultItem[] = [{
      id: randomUUID(),
      status: 'pendente',
      items: [{
        name: 'Les Paul guitar',
        quantity: 1,
      }],
    }];

    const ordersReader = new OrdersReader({
      getAll: () => Promise.resolve(fakeOrders),
    });

    const result = await ordersReader.read();

    expect(result).toMatchObject(fakeOrders);
  });
});