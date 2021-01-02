import { IQuery } from "./query.interface";
import { IQueryParams } from "./queryparams.interface";
export interface IQueryParser {
  parse(query: IQuery, config?: any): Promise<IQueryParams>;
}
