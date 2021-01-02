import { ICondition } from "./condition.interface";
import { IQueryParams } from "./queryparams.interface";
import { IQueryParser } from "./queryparser.interface";

/**
 * Represents a include (submodels) query
 */
export interface IIncludeQuery {
  name: string;
  type?: string;
  filter?: IQuery;
  parent?: IQuery;

  setParent(parent?: IQuery): IIncludeQuery;
  setFilter(filter?: IQuery): IIncludeQuery;
  setName(name: string): IIncludeQuery;
  setType(type: string): IIncludeQuery;
}

/**
 * Represents a query
 */
export interface IQuery<T = any> {
  conditions?: ICondition;
  orderBy?: string[];
  groupBy?: string[];
  attributes?: string[];
  include?: IIncludeQuery[];
  distinct?: boolean;
  args: any;
  take?: number;
  skip?: number;
  parser: IQueryParser;

  // setters
  setConditions(conditions: ICondition): IQuery<T>;
  setParser(parser: IQueryParser): IQuery<T>;
  setArgs(args: any): IQuery<T>;
  setSkip(value: number): IQuery<T>;
  setTake(value: number): IQuery<T>;
  limit(skip?: number, take?: number): IQuery<T>;

  // add to
  addSort(...sorts: string[]): IQuery<T>;
  sort(...sorts: string[]): IQuery<T>;
  addGroup(...groups: string[]): IQuery<T>;
  group(...groups: string[]): IQuery<T>;
  addAttributes(...fields: string[]): IQuery<T>;
  fields(...fields: string[]): IQuery<T>;
  addInclude(...include: IIncludeQuery[]): IQuery<T>;
  with(...include: IIncludeQuery[]): IQuery<T>;

  // conditions
  /**
   * Adds a AND condition
   * @param cond the condition to apply
   * @returns IQuery
   */
  where(...cond: ICondition[]): IQuery<T>;
  /**
   * Adds a OR condition
   * @param cond the condition to apply
   * @returns IQuery
   */
  orWhere(...cond: ICondition[]): IQuery<T>;
  /**
   * Adds a NOT condition
   * @param cond the condition to apply
   * @returns IQuery
   */
  whereNot(...cond: ICondition[]): IQuery<T>;

  // execute
  /**
   * Executes the query and returns the results
   * @param config config options passed to query
   * @returns RType[]
   */
  get<RType = T>(config?: any): Promise<RType[]>;
  /**
   * Executes the query and returns the first result
   * @param config config options passed to query
   * @returns RType
   */
  getOne<RType = T>(config?: any, defaultVal?: RType): Promise<RType>;
  /**
   * Executes the query and returns the result count
   * @param config config options passed to query
   * @returns number
   */
  count(config?: any): Promise<number>;

  // parse
  /**
   * Parse the query to be passed to the native query
   * @param config config options passed to query
   * @param reParse parse the query even if is already parsed
   * @returns RType[]
   */
  parse(config?: any, reParse?: boolean): Promise<IQueryParams>;

  // serialization
  deserialize(source: any): IQuery<T>;
}
