import { OrderStatusUpdateController } from '../../src/controllers/OrderStatusUpdateController';
import { randomUUID } from 'node:crypto';
import { UpdateOrderStatusCommand } from '../../src/domain/cqrs/command/UpdateOrderStatusCommand';
import { OrderStatusUpdate } from '../../src/domain/OrderStatusUpdate';

describe('OrderStatusUpdateController', () => {
  it('must send the status update command', async () => {
    const dispatch = jest.fn();
    const controller = new OrderStatusUpdateController({
      dispatch,
    });

    const statusUpdatePayload: OrderStatusUpdate = {
      orderId: randomUUID(),
      status: 'entregue',
    };

    const req: any = {
      params: {
        orderId: statusUpdatePayload.orderId,
      },
      body: {
        status: statusUpdatePayload.status,
      },
    };
    const res: any = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };

    await controller.handle(req, res);

    expect(dispatch).toHaveBeenCalledWith(new UpdateOrderStatusCommand(statusUpdatePayload));
  });

  it('must respond with 204 status code', async () => {
    const controller = new OrderStatusUpdateController({
      dispatch: jest.fn(),
    });

    const req: any = {
      params: {
        orderId: randomUUID(),
      },
      body: {
        status: 'entregue',
      },
    };
    const statusFn = jest.fn();
    const res: any = {
      status: statusFn.mockReturnValue({
        send: jest.fn(),
      }),
    };

    await controller.handle(req, res);

    expect(statusFn).toHaveBeenCalledWith(204);
  });
});