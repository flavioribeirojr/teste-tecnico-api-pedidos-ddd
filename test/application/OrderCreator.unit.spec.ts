import { OrderCreator } from '../../src/application/OrderCreator';
import { randomUUID } from 'node:crypto';

describe('OrderCreator', () => {
  it('must resolve order with id and created items', async () => {
    const createdId = randomUUID();
    const orderCreator = new OrderCreator({
      create: () => Promise.resolve({
        id: createdId,
        status: 'pendente',
        items: [],
      }),
    });

    const result = await orderCreator.create({
      items: [],
    });

    expect(result).toMatchObject({ id: createdId });
  });

  it('must return order with "pendente" status', async () => {
    const orderCreator = new OrderCreator({
      create: () => Promise.resolve({
        id: randomUUID(),
        status: 'pendente',
        items: [],
      }),
    });

    const result = await orderCreator.create({
      items: [],
    });

    expect(result).toMatchObject({ status: 'pendente' });
  });

  it('must return order with given items', async () => {
    const items = [{
      name: 'Les Paul guitar',
      quantity: 2,
    }];

    const orderCreator = new OrderCreator({
      create: () => Promise.resolve({
        id: randomUUID(),
        status: 'pendente',
        items,
      }),
    });

    const result = await orderCreator.create({
      items,
    });

    expect(result.items[0]).toMatchObject({
      name: 'Les Paul guitar',
      quantity: 2,
    });
  });
});