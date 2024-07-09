import { Query } from './Query';

export abstract class QueryHandler<T extends Query, QueryResult = void> {
  public abstract query: string;

  abstract handle(query: T): Promise<QueryResult>;
}