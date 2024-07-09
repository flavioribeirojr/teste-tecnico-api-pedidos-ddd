import { Request, Response } from 'express';
import { OrderCreation } from '../domain/OrderCreation';
import { Controller } from './Controller';
import { CommandBus } from '../domain/cqrs/command/CommandBus';
import { OrderCreated } from '../domain/OrderCreated';
import { CreateOrderCommand } from '../domain/cqrs/command/CreateOrderCommand';
import { z } from 'zod';

export class OrderCreateController implements Controller<void, OrderCreateRequest> {
  bodySchema = z.object({
    items: z.array(z.object({
      name: z.string(),
      quantity: z.number().min(1),
    })).min(1),
  });

  constructor(private commandBus: CommandBus<OrderCreated>) {}

  async handle(req: OrderCreateRequest, res: Response) {
    const orderCreated = await this.commandBus.dispatch(new CreateOrderCommand(req.body));

    res.status(201).send(orderCreated);
  }
}

export type OrderCreateRequest = Request<null, null, OrderCreation>;