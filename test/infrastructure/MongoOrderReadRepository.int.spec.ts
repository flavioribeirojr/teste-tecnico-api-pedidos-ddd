import mongoose, { Types } from 'mongoose';
import { startMongoDB } from '../../src/mongodb-starter';
import { Order } from '../../src/infrastructure/MongoSchema';
import { MongoOrderReadRepository } from '../../src/infrastructure/MongoOrderReadRepository';

describe('MongoOrderReadRepository', () => {
  beforeEach(async () => {
    await startMongoDB();
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it('must resolve the orders stored in the database', async () => {
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

    const repository = new MongoOrderReadRepository();
    const orders = await repository.getAll();

    expect(orders).toMatchObject([{
      id: orderId.toString(),
      status: 'pendente',
      items: [{
        name: 'Les Paul guitar',
        quantity: 1,
      }],
    }]);
  });
});