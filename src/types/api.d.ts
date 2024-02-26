import { IPagination } from "./pagination";

export interface IBaseResponseData {
  success: boolean;
  message: string;
}

export interface IBaseErrorResponseData extends IBaseResponseData {
  status: number;
}

export interface IErrorReponseData extends IBaseResponseData {
  errors: Error;
}

export interface IResponseData<T> extends IBaseResponseData {
  data: T;
}

export interface IPaginateResponseData<T> extends IBaseResponseData {
  data: T;
  pagination: IPagination;
}
