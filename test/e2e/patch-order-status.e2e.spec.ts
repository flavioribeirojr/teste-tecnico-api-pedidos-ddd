import mongoose, { Types } from 'mongoose';
import { startMongoDB } from '../../src/mongodb-starter';
import { Order } from '../../src/infrastructure/MongoSchema';
import { ContainerRegisterer } from '../../src/ioc';
import supertest from 'supertest';
import { ExpressHttpServer } from '../../src/infrastructure/http/ExpressHttpServer';

describe('PATCH /orders/:orderId/status', () => {
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

  it('PATCH /orders/:orderId/status must respond with 204 http code', async () => {
    const seed = {
      _id: new Types.ObjectId(),
      status: 'pendente',
      items: [{
        name: 'Les Paul Guitar',
        quantity: 2,
      }],
    };

    await Order.create(seed);

    const server = new ExpressHttpServer();
    const { app } = server.create();
    const response = await supertest(app)
      .patch(`/orders/${seed._id.toString()}/status`)
      .set('Content-Type', 'application/json')
      .send({ status: 'pronto' });

    expect(response.statusCode).toBe(204);
  });

  it('PATCH /orders/:orderId/status must alter the status of the order in the database', async () => {
    const seed = {
      _id: new Types.ObjectId(),
      status: 'pendente',
      items: [{
        name: 'Les Paul Guitar',
        quantity: 2,
      }],
    };

    await Order.create(seed);

    const server = new ExpressHttpServer();
    const { app } = server.create();
    await supertest(app)
      .patch(`/orders/${seed._id.toString()}/status`)
      .set('Content-Type', 'application/json')
      .send({ status: 'pronto' });

    const updatedOrder = await Order.findById(seed._id);

    expect(updatedOrder?.status).toBe('pronto');
  });

  it('PATCH /orders/:orderId/status must throw 404 when order does not exist', async () => {
    const fakeId = new Types.ObjectId();

    const server = new ExpressHttpServer();
    const { app } = server.create();
    const response = await supertest(app)
      .patch(`/orders/${fakeId.toString()}/status`)
      .set('Content-Type', 'application/json')
      .send({ status: 'pronto' });

    expect(response.statusCode).toBe(404);
  });

  it('PATCH /orders/:orderId/status must throw 422 if body is empty', async () => {
    const fakeId = new Types.ObjectId();

    const server = new ExpressHttpServer();
    const { app } = server.create();
    const response = await supertest(app)
      .patch(`/orders/${fakeId.toString()}/status`)
      .set('Content-Type', 'application/json')
      .send({});

    expect(response.statusCode).toBe(422);
  });

  it('PATCH /orders/:orderId/status must throw 422 if status is invalid', async () => {
    const fakeId = new Types.ObjectId();

    const server = new ExpressHttpServer();
    const { app } = server.create();
    const response = await supertest(app)
      .patch(`/orders/${fakeId.toString()}/status`)
      .set('Content-Type', 'application/json')
      .send({
        status: 'pendente',
      });

    expect(response.statusCode).toBe(422);
  });
});