import { CommandHandler } from '../domain/cqrs/command/CommandHandler';
import { CreateOrderCommand } from '../domain/cqrs/command/CreateOrderCommand';
import { OrderCreated } from '../domain/OrderCreated';
import { OrderCreator } from './OrderCreator';

export class CreateOrderCommandHandler implements CommandHandler<CreateOrderCommand, OrderCreated> {
  public command = CreateOrderCommand.name;

  constructor(private orderCreator: OrderCreator) {}

  async handle(command: CreateOrderCommand) {
    const order = await this.orderCreator.create(command.payload);

    return order;
  }
}