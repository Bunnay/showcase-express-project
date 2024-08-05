import { ValidationErrors } from "validatorjs";
import { Response } from "express";
import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
} from "../constants/apiResponseData";
import { IPagination } from "../types/pagination";
import { ApiResponse } from "../utils/apiResponseBuilder";

export class BaseApiResponse {
  private success: boolean;
  private status_code: number;
  private message: string;

  constructor(success: boolean, status_code: number, message: string) {
    this.success = success;
    this.status_code = status_code;
    this.message = message;
  }

  public getStatusCode() {
    return this.status_code;
  }
}

export class SuccessApiResponse<T> extends BaseApiResponse {
  private data?: T;
  private pagination?: IPagination;

  constructor(message?: string, data?: T, pagination?: IPagination) {
    super(
      true,
      RESPONSE_STATUS_CODES.SUCCESS,
      message || RESPONSE_MESSAGES.SUCCESS
    );

    this.data = data;
    this.pagination = pagination;
  }
}

export class ErrorApiResponse extends BaseApiResponse {
  private errors?: Error | ValidationErrors;

  constructor(
    status_code: number = RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message?: string,
    errors?: Error | ValidationErrors
  ) {
    super(
      false,
      status_code,
      message || RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
    );
    this.errors = errors;
  }

  static handleError(error: unknown, res: Response) {
    if (error instanceof ErrorApiResponse) {
      res.status(error.getStatusCode()).json(error);
    } else if (error instanceof Error) {
      res.status(500).json(new ErrorApiResponse(500, error.message));
    } else {
      res
        .status(500)
        .json(new ErrorApiResponse(500, "An unexpected error occurred."));
    }
  }

  // Bad request
  static BadRequest(message: string = RESPONSE_MESSAGES.BAD_REQUEST) {
    return new ApiResponse()
      .withStatusCode(RESPONSE_STATUS_CODES.BAD_REQUEST)
      .withMessage(message)
      .BuildErrorResponse();
  }

  // Unauthorized
  static Unauthorized(message: string = RESPONSE_MESSAGES.UNAUTHORIZED) {
    return new ApiResponse()
      .withStatusCode(RESPONSE_STATUS_CODES.UNAUTHORIZED)
      .withMessage(message)
      .BuildErrorResponse();
  }

  // Forbidden
  static Forbidden(message: string = RESPONSE_MESSAGES.FORBIDDEN) {
    return new ApiResponse()
      .withStatusCode(RESPONSE_STATUS_CODES.FORBIDDEN)
      .withMessage(message)
      .BuildErrorResponse();
  }

  // Not found
  static NotFound(message: string = RESPONSE_MESSAGES.NOT_FOUND) {
    return new ApiResponse()
      .withStatusCode(RESPONSE_STATUS_CODES.NOT_FOUND)
      .withMessage(message)
      .BuildErrorResponse();
  }

  // Too many request
  static TooManyRequest(message: string = RESPONSE_MESSAGES.TOO_MANY_REQUEST) {
    return new ApiResponse()
      .withStatusCode(RESPONSE_STATUS_CODES.TOO_MANY_REQUEST)
      .withMessage(message)
      .BuildErrorResponse();
  }
}
