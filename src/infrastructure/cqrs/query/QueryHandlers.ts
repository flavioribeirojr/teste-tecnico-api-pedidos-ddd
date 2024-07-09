import { Query } from '../../../domain/cqrs/query/Query';
import { QueryHandler } from '../../../domain/cqrs/query/QueryHandler';
import { QueryNotFoundError } from '../../../domain/cqrs/query/QueryNotFoundError';

export class QueryHandlers {
  private handlers = new Map<string, QueryHandler<Query>>;

  constructor(handlers: QueryHandler<Query>[]) {
    handlers.forEach(handler => {
      this.handlers.set(handler.query, handler);
    });
  }

  get(query: Query) {
    const handler = this.handlers.get(query.constructor.name);

    if (!handler) {
      throw new QueryNotFoundError(query);
    }

    return handler;
  }
}