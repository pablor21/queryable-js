import { ICondition } from "./condition.interface";
import { operator } from "./operator.enum";

export class Condition implements ICondition {
  public field?: string;
  public op: string = operator.eq;
  public value: any;
  public and: ICondition[] = [];
  public or: ICondition[] = [];
  public not: ICondition[] = [];

  constructor(field?: string, opOrValue?: string | any, value?: any) {
    this.field = field;
    if (undefined !== value) {
      this.op = opOrValue;
      this.value = value;
    } else {
      this.value = opOrValue;
    }
  }

  public where(...cond: ICondition[]): ICondition {
    this.and = this.and || [];
    cond.map(c => {
      this.and.push(c);
    });
    return this;
  }
  public orWhere(...cond: ICondition[]): ICondition {
    this.or = this.or || [];
    cond.map(c => {
      this.or.push(c);
    });
    return this;
  }
  public whereNot(...cond: ICondition[]): ICondition {
    this.not = this.not || [];
    cond.map(c => {
      this.not.push(c);
    });
    return this;
  }

  public deserialize(input: any): Condition {
    if (input) {
      if (input.field) {
        this.field = input.field;
        this.op = input.op;
        this.value = input.value;
      }
      if (input.and) {
        input.and.map((i: any) => {
          this.and.push(new Condition().deserialize(i));
        });
      }
      if (input.or) {
        input.or.map((i: any) => {
          this.or.push(new Condition().deserialize(i));
        });
      }
      if (input.not) {
        input.not.map((i: any) => {
          this.not.push(new Condition().deserialize(i));
        });
      }
    }
    return this;
  }
}
