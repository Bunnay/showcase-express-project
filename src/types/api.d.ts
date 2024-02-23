import { IPagination } from "./pagination";

export interface IBaseResponseData {
  success: boolean;
  status?: number;
  message: string;
}

interface IErrorReponseData extends IBaseResponseData {
  errors: Error;
}

export interface IResponseData<T> extends IBaseResponseData {
  data: T;
}

export interface IPaginateResponseData<T> extends IBaseResponseData {
  data: T;
  pagination: IPagination;
}
