import { OrderStatusUpdater } from '../../src/application/OrderStatusUpdater';
import { randomUUID } from 'node:crypto';
import { OrderStatusUpdate } from '../../src/domain/OrderStatusUpdate';

describe('OrderStatusUpdater', () => {
  it('must update call the repository update method', async () => {
    const updateFn = jest.fn();
    const orderStatusUpdater = new OrderStatusUpdater({
      update: updateFn,
    });

    const orderStatusUpdate: OrderStatusUpdate = {
      orderId: randomUUID(),
      status: 'em preparação',
    };

    await orderStatusUpdater.update(orderStatusUpdate);

    expect(updateFn).toHaveBeenCalledWith(orderStatusUpdate);
  });
});