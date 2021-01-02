export interface IQueryParams {
  where?: any;
  attributes?: any[];
  skip?: number;
  take?: number;
  order?: any;
  include?: IIncludeQueryParams[];
}

export interface IIncludeQueryParams extends IQueryParams {
  name?: string;
  as?: string;
  modelName?: string;
}
