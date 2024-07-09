import { Request, Response } from 'express';
import { Controller } from './Controller';
import { QueryBus } from '../domain/cqrs/query/QueryBus';
import { OrderReadResult } from '../domain/OrderReadResult';
import { OrderReadQuery } from '../domain/cqrs/query/OrderReadQuery';

export class OrdersReadController implements Controller {
  constructor(private queryBus: QueryBus<OrderReadResult>) {}

  async handle(req: Request, res: Response) {
    const orders = await this.queryBus.dispatch(new OrderReadQuery());

    res.status(200).json(orders);
  }
}