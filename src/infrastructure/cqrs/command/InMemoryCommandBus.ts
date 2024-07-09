import { Command } from '../../../domain/cqrs/command/Command';
import { CommandHandlers } from './CommandHandlers';

export class InMemoryCommandBus {
  constructor(private commandHandlers: CommandHandlers) {}

  async dispatch(command: Command) {
    const handler = this.commandHandlers.get(command);
    const result = await handler.handle(command);

    return result;
  }
}