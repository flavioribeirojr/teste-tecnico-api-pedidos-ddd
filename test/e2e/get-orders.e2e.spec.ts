import mongoose, { Types } from 'mongoose';
import { startMongoDB } from '../../src/mongodb-starter';
import { ContainerRegisterer } from '../../src/ioc';
import supertest from 'supertest';
import { Order } from '../../src/infrastructure/MongoSchema';
import { ExpressHttpServer } from '../../src/infrastructure/http/ExpressHttpServer';

describe('GET /orders', () => {
  beforeAll(() => {
    const containerRegisterer = new ContainerRegisterer();
    containerRegisterer.register();
  });

  beforeEach(async () => {
    await startMongoDB();
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it('GET /orders must return http code 200', async () => {
    const server = new ExpressHttpServer();
    const { app } = server.create();

    const response = await supertest(app).get('/orders');

    expect(response.statusCode).toBe(200);
  });

  it('GET /orders must return the orders in the database', async () => {
    const id = new Types.ObjectId();
    const seed = [
      {
        _id: id,
        status: 'pendente',
        items: [{
          name: 'Les Paul Guitar',
          quantity: 2,
        }],
      },
    ];

    await Order.insertMany(seed);

    const server = new ExpressHttpServer();
    const { app } = server.create();
    const response = await supertest(app).get('/orders');

    expect(response.body).toMatchObject([{
      id: id.toString(),
      status: 'pendente',
      items: [{
        name: 'Les Paul Guitar',
        quantity: 2,
      }],
    }]);
  });
});