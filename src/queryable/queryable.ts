import { IQuery } from "./query.interface";
import { IQueryable } from "./queryable.interface";

export class Queryable<T = any, QueryType extends IQuery<T> = IQuery<T>>
  implements IQueryable<T> {
  constructor(protected queryType: any) {}

  public async query(): Promise<QueryType> {
    return new this.queryType();
  }

  public async prepareQuery(query: IQuery): Promise<QueryType> {
    if (!(query instanceof this.queryType)) {
      query = (await this.query()).deserialize(query);
    }
    return query as QueryType;
  }

  public async get(query: IQuery<any>, ...args: any): Promise<T[]> {
    return (await this.prepareQuery(query)).get<T>(args);
  }

  public async getOne(
    query: IQuery<any>,
    defaultVal?: T,
    ...args: any
  ): Promise<T> {
    return (await this.prepareQuery(query)).getOne<T>(args, defaultVal);
  }

  public async count(query: IQuery<any>, ...args: any): Promise<number> {
    return (await this.prepareQuery(query)).count(args);
  }
}
