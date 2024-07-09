import { CommandHandler } from '../domain/cqrs/command/CommandHandler';
import { UpdateOrderStatusCommand } from '../domain/cqrs/command/UpdateOrderStatusCommand';
import { OrderStatusUpdater } from './OrderStatusUpdater';

export class UpdateOrderStatusCommandHandler implements CommandHandler<UpdateOrderStatusCommand, void> {
  public command = UpdateOrderStatusCommand.name;

  constructor(private orderStatusUpdater: OrderStatusUpdater) {}

  async handle(command: UpdateOrderStatusCommand) {
    await this.orderStatusUpdater.update(command.payload);
  }
}