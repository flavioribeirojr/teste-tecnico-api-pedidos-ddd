import mongoose from 'mongoose';
import { startMongoDB } from '../../src/mongodb-starter';
import { MongoOrderCreatorRepository } from '../../src/infrastructure/MongoOrderCreatorRepository';
import { Order } from '../../src/infrastructure/MongoSchema';

describe('MongoOrderCreatorRepository', () => {
  beforeEach(async () => {
    await startMongoDB();
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it('must store the order in the database', async () => {
    const repository = new MongoOrderCreatorRepository();
    const result = await repository.create({
      items: [{ name: 'Les Paul Guitar', quantity: 1 }],
    });

    const storedOrder = await Order.findById(result.id);

    expect(storedOrder).not.toBeNull();
  });

  it('must store the order with "pendente" status by default', async () => {
    const repository = new MongoOrderCreatorRepository();
    const result = await repository.create({
      items: [{ name: 'Les Paul Guitar', quantity: 1 }],
    });

    const storedOrder = await Order.findById(result.id);

    expect(storedOrder?.status).toBe('pendente');
  });
});