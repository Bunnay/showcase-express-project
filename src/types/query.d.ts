export interface IQuery {
  search: string;
  sort: string;
  include: string;
  page: IPage;
  filter: IFilter;
}

export interface IPage {
  number: number;
  size: number;
}

export interface IFilter {
  [key: string]: string;
}

export interface ISqlQuery {
  where: object;
  include: IInclude[];
  order: string[][];
  offset: number | string;
  limit: number | string;
}

export interface IInclude {
  model: any;
  as: string | undefined;
  through: any;
  include?: IInclude[];
  required?: boolean;
}
