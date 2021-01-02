import { Condition } from "./condition";
import { ICondition } from "./condition.interface";
import { IncludeQuery } from "./includequery";
import { IIncludeQuery, IQuery } from "./query.interface";
import { IQueryParams } from "./queryparams.interface";
import { IQueryParser } from "./queryparser.interface";

export class Query<T = any> implements IQuery<T> {
  public static fromObject(source?: any, parser?: IQueryParser): IQuery {
    const ret = new this(parser);
    return ret.deserialize(source);
  }

  protected _conditions?: ICondition;
  protected _orderBy?: string[];
  protected _groupBy?: string[];
  protected _attributes?: string[];
  protected _include?: IIncludeQuery[];
  protected _distinct?: boolean;
  protected _args: any;
  protected _take?: number;
  protected _skip?: number;
  protected _parser: IQueryParser;
  protected _queryParams?: IQueryParams;

  constructor(parser?: IQueryParser) {
    this._parser = parser || ((null as unknown) as IQueryParser);
  }

  public get conditions(): ICondition {
    if (!this._conditions) {
      this._conditions = new Condition();
    }
    return this._conditions;
  }

  public set conditions(value: ICondition) {
    this._conditions = value;
  }

  public get orderBy(): string[] {
    if (!this._orderBy) {
      this._orderBy = [];
    }
    return this._orderBy;
  }

  public set orderBy(value: string[]) {
    this._orderBy = value;
  }

  public get groupBy(): string[] {
    if (!this._groupBy) {
      this._groupBy = [];
    }
    return this._groupBy;
  }

  public set groupBy(value: string[]) {
    this._groupBy = value;
  }

  public get attributes(): string[] {
    if (!this._attributes) {
      this._attributes = [];
    }
    return this._attributes;
  }

  public set attributes(value: string[]) {
    this._attributes = value;
  }

  public get include(): IIncludeQuery[] {
    if (!this._include) {
      this._include = [];
    }
    return this._include;
  }

  public set include(value: IIncludeQuery[]) {
    this._include = value;
  }

  public get args(): any {
    return this._args;
  }

  public set args(value: any) {
    this._args = value;
  }

  public get take(): number | undefined {
    return this._take;
  }

  public set take(value: number | undefined) {
    this._take = value;
  }

  public get skip(): number | undefined {
    return this._skip;
  }

  public set skip(value: number | undefined) {
    this._skip = value;
  }

  public get parser(): IQueryParser {
    return this._parser;
  }

  public set parser(value: IQueryParser) {
    this._parser = value;
  }

  // setters
  public setConditions(conditions: ICondition): IQuery {
    this.conditions = conditions;
    return this;
  }
  public setParser(parser: IQueryParser): IQuery {
    this._parser = parser;
    return this;
  }
  public setArgs(args: any): IQuery {
    this.args = args;
    return this;
  }
  public setSkip(value: number): IQuery {
    this.skip = value;
    return this;
  }
  public setTake(value: number): IQuery {
    this.take = value;
    return this;
  }

  // add to
  public addSort(...sorts: string[]): IQuery {
    this.orderBy.push(...sorts);
    return this;
  }
  public sort(...sorts: string[]): IQuery {
    this.addSort(...sorts);
    return this;
  }

  public addGroup(...groups: string[]): IQuery {
    this.groupBy.push(...groups);
    return this;
  }

  public group(...groups: string[]): IQuery {
    this.addGroup(...groups);
    return this;
  }

  public addAttributes(...fields: string[]): IQuery {
    this.attributes.push(...fields);
    return this;
  }

  public fields(...fields: string[]): IQuery {
    this.addAttributes(...fields);
    return this;
  }

  public limit(skip?: number, take?: number): IQuery {
    this.skip = skip;
    this.take = take;
    return this;
  }

  public addInclude(...include: IIncludeQuery[]): IQuery {
    include.map(i => (i.parent = this));
    this.include.push(...include);
    return this;
  }
  public with(...include: IIncludeQuery[]): IQuery {
    this.addInclude(...include);
    return this;
  }

  /// INTERFACE METHODS
  public where(...cond: ICondition[]): IQuery {
    this.conditions.where(...cond);
    return this;
  }
  public orWhere(...cond: ICondition[]): IQuery {
    this.conditions.orWhere(...cond);
    return this;
  }
  public whereNot(...cond: ICondition[]): IQuery {
    this.conditions.whereNot(...cond);
    return this;
  }

  public async get<RType = T>(config?: any): Promise<RType[]> {
    return [];
  }

  public async getOne<RType = T>(
    config?: any,
    defaultVal?: RType
  ): Promise<RType> {
    return null as any;
  }

  public async count(config?: any): Promise<number> {
    return 0;
  }

  public async parse(
    config?: any,
    reParse: boolean = false
  ): Promise<IQueryParams> {
    if (reParse || !this._queryParams) {
      this._queryParams = await this.parser.parse(this, config);
    }
    return this._queryParams;
  }

  public deserialize(source?: any): IQuery {
    if (source) {
      source = this.parseInput(source);
      this.conditions.deserialize(source.conditions);
      this.orderBy = source.orderBy;
      this.include = this.parseInclude(source.include);
      this.attributes = source.attributes;
      this.groupBy = source.groupBy;
    }
    return this;
  }

  protected parseInput(input?: any): any {
    input = input || {};
    if (input.conditions && input.conditions.field) {
      input.conditions.and = input.conditions.and || [];
      input.conditions.and.push({
        field: input.conditions.field,
        op: input.conditions.op,
        value: input.conditions.value
      });
      delete input.conditions.field;
      delete input.conditions.value;
      delete input.conditions.op;
    }
    return input;
  }

  protected parseInclude(input: any): IIncludeQuery[] {
    const ret: IIncludeQuery[] = [];
    if (Array.isArray(input)) {
      input.map(c => {
        ret.push(IncludeQuery.fromObject(this, c));
      });
    } else {
      ret.push(IncludeQuery.fromObject(this, input));
    }
    return ret;
  }
}
