import { IIncludeQuery, IQuery } from "./query.interface";

export class IncludeQuery implements IIncludeQuery {
  public static fromObject(parent: IQuery, source?: any): IIncludeQuery {
    const ret = new this(parent);
    return ret.deserialize(source);
  }

  public name: string = "";
  public type?: string;
  public filter?: IQuery;

  constructor(public parent?: IQuery) {}

  public deserialize(source?: any): IIncludeQuery {
    if (source) {
      this.name = source.name;
      this.type = source.type;
      this.filter = Object.create(this.parent || {}) as IQuery;
      this.filter.deserialize(source.filter);
    }
    return this;
  }

  public setParent(parent?: IQuery): IIncludeQuery {
    this.parent = parent;
    return this;
  }
  public setFilter(filter?: IQuery): IIncludeQuery {
    this.filter = filter;
    return this;
  }
  public setName(name: string): IIncludeQuery {
    this.name = name;
    return this;
  }
  public setType(type: string): IIncludeQuery {
    this.type = type;
    return this;
  }
}
