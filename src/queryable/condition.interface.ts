export interface ICondition {
  field?: string;
  op?: string;
  value?: any;
  and?: ICondition[];
  or?: ICondition[];
  not?: ICondition[];
  where(...cond: ICondition[]): ICondition;
  orWhere(...cond: ICondition[]): ICondition;
  whereNot(...cond: ICondition[]): ICondition;
  deserialize(input: any): ICondition;
}
