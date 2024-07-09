import { Request, Response } from 'express';
import { Controller } from './Controller';
import { OrderStatusUpdate } from '../domain/OrderStatusUpdate';
import { CommandBus } from '../domain/cqrs/command/CommandBus';
import { UpdateOrderStatusCommand } from '../domain/cqrs/command/UpdateOrderStatusCommand';
import { OrderNotFoundError } from '../domain/OrderNotFoundError';
import { z } from 'zod';

export class OrderStatusUpdateController implements Controller<
  Promise<void>,
  OrderStatusUpdateRequest
> {
  bodySchema = z.object({
    status: z.enum(['em preparação', 'pronto', 'entregue']),
  });

  constructor(private commandBus: CommandBus<void>) {}

  async handle(req: OrderStatusUpdateRequest, res: Response) {
    try {
      await this.commandBus.dispatch(new UpdateOrderStatusCommand({
        orderId: req.params.orderId,
        status: req.body.status,
      }));

      res.status(204).send();
    } catch (err) {
      if (err instanceof OrderNotFoundError) {
        res.status(404).send(err.message);
        return;
      }
    }
  }
}

type OrderStatusUpdateRequest = Request<{ orderId: string }, null, { status: OrderStatusUpdate['status'] }>;