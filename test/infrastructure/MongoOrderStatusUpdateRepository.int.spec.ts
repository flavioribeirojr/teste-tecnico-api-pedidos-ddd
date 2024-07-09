import mongoose, { Types } from 'mongoose';
import { startMongoDB } from '../../src/mongodb-starter';
import { Order } from '../../src/infrastructure/MongoSchema';
import { MongoOrderStatusUpdateRepository } from '../../src/infrastructure/MongoOrderStatusUpdateRepository';
import { OrderNotFoundError } from '../../src/domain/OrderNotFoundError';

describe('MongoOrderStatusUpdateRepository', () => {
  beforeEach(async () => {
    await startMongoDB();
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it('must update the order status with the given input', async () => {
    const orderId = new Types.ObjectId();
    const ordersSeed = [{
      _id: orderId,
      status: 'pendente',
      items: [{
        name: 'Les Paul guitar',
        quantity: 1,
      }],
    }];

    await Order.insertMany(ordersSeed);

    const repository = new MongoOrderStatusUpdateRepository();
    await repository.update({
      orderId: orderId.toString(),
      status: 'entregue',
    });

    const updatedRecord = await Order.findById(orderId);
    expect(updatedRecord?.status).toBe('entregue');
  });

  it('must throw OrderNotFoundError when order does not exist', async () => {
    const orderId = new Types.ObjectId();

    const repository = new MongoOrderStatusUpdateRepository();
    const updatePromise = repository.update({
      orderId: orderId.toString(),
      status: 'entregue',
    });

    await expect(updatePromise).rejects.toThrow(OrderNotFoundError);
  });
});