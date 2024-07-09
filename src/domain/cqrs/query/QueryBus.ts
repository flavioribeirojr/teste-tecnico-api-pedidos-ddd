import { Query } from './Query';

export interface QueryBus<T> {
  dispatch(query: Query): Promise<T>;
}