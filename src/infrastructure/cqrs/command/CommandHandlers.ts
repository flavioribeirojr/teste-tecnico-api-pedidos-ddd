import { Command } from '../../../domain/cqrs/command/Command';
import { CommandHandler } from '../../../domain/cqrs/command/CommandHandler';
import { CommandNotFoundError } from '../../../domain/cqrs/command/CommandNotFoundError';

export class CommandHandlers {
  private handlers = new Map<string, CommandHandler<Command>>;

  constructor(handlers: CommandHandler<Command>[]) {
    handlers.forEach(handler => {
      this.handlers.set(handler.command, handler);
    });
  }

  get(command: Command) {
    const handler = this.handlers.get(command.constructor.name);

    if (!handler) {
      throw new CommandNotFoundError(command);
    }

    return handler;
  }
}