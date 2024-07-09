import { Command } from './Command';
import { OrderCreation } from '../../OrderCreation';

export class CreateOrderCommand extends Command {
  constructor(public payload: OrderCreation) {
    super();
  }
}