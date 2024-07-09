import { OrderCreateController } from '../../src/controllers/OrderCreateController';
import { OrderCreation } from '../../src/domain/OrderCreation';
import { CreateOrderCommand } from '../../src/domain/cqrs/command/CreateOrderCommand';
import { randomUUID } from 'node:crypto';

describe('OrderCreateController', () => {
  it('must send the create order command', async () => {
    const dispatch = jest.fn();
    const controller = new OrderCreateController({
      dispatch,
    });

    const body: OrderCreation = {
      items: [{
        name: 'Les Paul Guitar',
        quantity: 1,
      }],
    };

    const req: any = {
      body,
    };
    const res: any = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };

    await controller.handle(
      req,
      res,
    );

    expect(dispatch).toHaveBeenCalledWith(new CreateOrderCommand(body));
  });

  it('must respond with 201 status code', async () => {
    const controller = new OrderCreateController({
      dispatch: jest.fn(),
    });

    const body: OrderCreation = {
      items: [{
        name: 'Les Paul Guitar',
        quantity: 1,
      }],
    };

    const req: any = {
      body,
    };
    const statusFn = jest.fn();
    const res: any = {
      status: statusFn.mockReturnValue({
        send: jest.fn(),
      }),
    };

    await controller.handle(
      req,
      res,
    );

    expect(statusFn).toHaveBeenCalledWith(201);
  });

  it('must respond with the created order body', async () => {
    const dispatchReturnValue = {
      id: randomUUID(),
      status: 'pendente',
      items: [{
        name: 'Les Paul Guitar',
        quantity: 1,
      }],
    };

    const controller = new OrderCreateController({
      dispatch: jest.fn().mockResolvedValue(dispatchReturnValue),
    });

    const body: OrderCreation = {
      items: [{
        name: 'Les Paul Guitar',
        quantity: 1,
      }],
    };

    const req: any = {
      body,
    };
    const sendFn = jest.fn();
    const res: any = {
      status: jest.fn().mockReturnValue({
        send: sendFn,
      }),
    };

    await controller.handle(
      req,
      res,
    );

    expect(sendFn).toHaveBeenCalledWith(dispatchReturnValue);
  });
});