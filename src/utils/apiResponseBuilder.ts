import { ValidationErrors } from "validatorjs";
import {
  RESPONSE_STATUS_CODES,
  RESPONSE_MESSAGES,
} from "../constants/apiResponseData";
import {
  BaseApiResponse,
  ErrorApiResponse,
  SuccessApiResponse,
} from "../models/apiResponse";
import { IPagination } from "../types/pagination";
import { IQuery } from "../types/query";

export class ApiResponse<T> {
  status_code: number = RESPONSE_STATUS_CODES.SUCCESS;
  success: boolean = false;
  message: string = RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR;
  data?: T;
  pagination?: IPagination;
  errors?: Error | ValidationErrors;

  public withStatusCode(status_code: number) {
    this.status_code = status_code;
    return this;
  }

  public withSuccess(success: boolean) {
    this.success = success;
    return this;
  }

  public withMessage(message: string) {
    this.message = message;
    return this;
  }

  public withData(data: T) {
    this.data = data;
    return this;
  }

  public withPagination(query: Partial<IQuery>, total: number) {
    const pageSize = (query.page && query.page.size) || 15;
    const pageNumber = (query.page && query.page.number) || 1;

    const limit = parseInt(`${pageSize}`, 10);
    const totalPages = Math.ceil(total / limit);

    const pagination: IPagination = {
      current_page: parseInt(`${pageNumber}`, 10),
      last_page: totalPages,
      page_size: limit,
      total: total,
    };

    this.pagination = pagination;
    return this;
  }

  public withError(errors: Error | ValidationErrors) {
    this.errors = errors;
    return this;
  }

  public BuildResponse() {
    return new BaseApiResponse(this.success, this.status_code, this.message);
  }

  public BuildSuccessResponse() {
    return new SuccessApiResponse(this.message, this.data, this.pagination);
  }

  public BuildErrorResponse() {
    return new ErrorApiResponse(this.status_code, this.message, this.errors);
  }
}
