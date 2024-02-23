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

export interface SQLQuery {
  where: object;
  include: Include[];
  order: string[][];
  offset: number | string;
  limit: number | string;
}

export interface Include {
  model: any;
  as: string | undefined;
  through: any;
  include?: Include[];
  required?: boolean;
}
