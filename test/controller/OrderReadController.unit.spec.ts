import { OrdersReadController } from '../../src/controllers/OrdersReadController';
import { randomUUID } from 'node:crypto';

describe('OrdersReadController', () => {
  it('must send the read order query', async () => {
    const dispatch = jest.fn();
    const controller = new OrdersReadController({
      dispatch,
    });

    const req: any = {};
    const res: any = {
      status: jest.fn().mockReturnValue({
        json: jest.fn(),
      }),
    };

    await controller.handle(req, res);

    expect(dispatch).toHaveBeenCalled();
  });

  it('must respond with 200 status code', async () => {
    const controller = new OrdersReadController({
      dispatch: jest.fn(),
    });

    const req: any = {};
    const statusFn = jest.fn();
    const res: any = {
      status: statusFn.mockReturnValue({
        json: jest.fn(),
      }),
    };

    await controller.handle(req, res);

    expect(statusFn).toHaveBeenCalledWith(200);
  });

  it('must respond with array of orders', async () => {
    const responseBody = [
      {
        id: randomUUID(),
        status: 'pendente',
        items: [{
          name: 'Les Paul Guitar',
          quantity: 2,
        }],
      },
    ];

    const controller = new OrdersReadController({
      dispatch: jest.fn().mockResolvedValue(responseBody),
    });

    const req: any = {};
    const jsonFn = jest.fn();
    const res: any = {
      status: jest.fn().mockReturnValue({
        json: jsonFn,
      }),
    };

    await controller.handle(req, res);

    expect(jsonFn).toHaveBeenCalledWith(responseBody);
  });
});