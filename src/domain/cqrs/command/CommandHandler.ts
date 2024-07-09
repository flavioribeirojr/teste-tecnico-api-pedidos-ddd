import { Command } from './Command';

export abstract class CommandHandler<T extends Command, CommandResult = void> {
  public abstract command: string;

  abstract handle(command: T): Promise<CommandResult>;
}