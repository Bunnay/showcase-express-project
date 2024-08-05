export interface IQuery {
  search: string;
  sort: string;
  include: string;
  page: {
    number: number;
    size: number;
  };
  filter: {
    [key: string]: string;
  };
}

export interface IInclude {
  model: any;
  as: string | undefined;
  through?: any;
  include?: IInclude[];
  required?: boolean;
}
