import { Command } from './Command';
import { OrderStatusUpdate } from '../../OrderStatusUpdate';

export class UpdateOrderStatusCommand extends Command {
  constructor(public payload: OrderStatusUpdate) {
    super();
  }
}