import { Command } from './Command';

export interface CommandBus<T> {
  dispatch(command: Command): Promise<T>;
}