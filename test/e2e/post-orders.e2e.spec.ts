import mongoose from 'mongoose';
import { startMongoDB } from '../../src/mongodb-starter';
import request from 'supertest';
import { ContainerRegisterer } from '../../src/ioc';
import { Order } from '../../src/infrastructure/MongoSchema';
import { ExpressHttpServer } from '../../src/infrastructure/http/ExpressHttpServer';

describe('POST /orders', () => {
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

  it('POST /orders must return with 201 http status code', async () => {
    const server = new ExpressHttpServer();
    const { app } = server.create();

    const response = await request(app)
      .post('/orders')
      .set('Content-Type', 'application/json')
      .send({
        items: [{
          name: 'Les Paul Guitar',
          quantity: 2,
        }],
      });

    expect(response.statusCode).toBe(201);
  });

  it('POST /orders must return the created order in body', async () => {
    const server = new ExpressHttpServer();
    const { app } = server.create();

    const response = await request(app)
      .post('/orders')
      .set('Content-Type', 'application/json')
      .send({
        items: [{
          name: 'Les Paul Guitar',
          quantity: 2,
        }],
      });

    expect(response.body).toMatchObject({
      id: expect.any(String),
      status: 'pendente',
      items: [{
        name: 'Les Paul Guitar',
        quantity: 2,
      }],
    });
  });

  it('POST /orders must create an order in the database', async () => {
    const server = new ExpressHttpServer();
    const { app } = server.create();

    const response = await request(app)
      .post('/orders')
      .set('Content-Type', 'application/json')
      .send({
        items: [{
          name: 'Les Paul Guitar',
          quantity: 2,
        }],
      });

    const createdOrder = await Order.findById(response.body.id);
    expect(createdOrder).not.toBeNull();
  });

  it('POST /orders must return 422 status code if body is empty', async () => {
    const server = new ExpressHttpServer();
    const { app } = server.create();

    const response = await request(app)
      .post('/orders')
      .set('Content-Type', 'application/json')
      .send({});

    expect(response.statusCode).toBe(422);
  });

  it('POST /orders must return 422 status code if items is empty', async () => {
    const server = new ExpressHttpServer();
    const { app } = server.create();

    const response = await request(app)
      .post('/orders')
      .set('Content-Type', 'application/json')
      .send({
        items: [],
      });

    expect(response.statusCode).toBe(422);
  });

  it('POST /orders must return 422 status code if item quantity is 0', async () => {
    const server = new ExpressHttpServer();
    const { app } = server.create();

    const response = await request(app)
      .post('/orders')
      .set('Content-Type', 'application/json')
      .send({
        items: [{
          name: 'Les Paul Guitar',
          quantity: 0,
        }],
      });

    expect(response.statusCode).toBe(422);
  });
});