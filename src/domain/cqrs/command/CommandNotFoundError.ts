import { Command } from './Command';

export class CommandNotFoundError extends Error {
  constructor(command: Command) {
    super(`Command ${command.constructor.name} not found`);
  }
}