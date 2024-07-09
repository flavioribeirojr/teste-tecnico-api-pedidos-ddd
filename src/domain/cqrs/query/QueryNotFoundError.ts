import { Query } from './Query';

export class QueryNotFoundError extends Error {
  constructor(query: Query) {
    super(`Command ${query.constructor.name} not found`);
  }
}