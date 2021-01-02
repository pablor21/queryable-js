import { IQuery } from "./query.interface";

/**
 * Represents a class with results that can be filtered using IQuery
 */
export interface IQueryable<T> {
  /**
   * Get a new query to start filtering
   */
  query(): Promise<IQuery>;
  /**
   * Get the results of a query
   * @param query the query to execute
   * @param args arguments
   */
  get(query: IQuery, ...args: any): Promise<T[]>;
  /**
   * Get one result of a query
   * @param query the query to execute
   * @param defaultVal the default value
   * @param args arguments
   */
  getOne(query: IQuery, defaultVal?: T, ...args: any): Promise<T>;
  /**
   * Get the count of results
   * @param query the query to execute
   * @param args args
   */
  count(query: IQuery, ...args: any): Promise<number>;
}
