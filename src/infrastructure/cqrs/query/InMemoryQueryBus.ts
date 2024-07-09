import { Query } from '../../../domain/cqrs/query/Query';
import { QueryHandlers } from './QueryHandlers';

export class InMemoryQueryBus {
  constructor(private queryHandlers: QueryHandlers) {}

  async dispatch(query: Query) {
    const handler = this.queryHandlers.get(query);
    const result = await handler.handle(query);

    return result;
  }
}