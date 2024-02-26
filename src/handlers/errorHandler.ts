import { IBaseErrorResponseData } from "../types/api";

class ErrorHandler extends Error {
  public success: false;
  public message: string;
  public status: number;

  constructor(err?: IBaseErrorResponseData) {
    super("Internal Server Error");
    this.success = false;
    this.status = err?.status || 500;
    this.message = err?.message || "Internal Server Error";
  }

  render() {
    return {
      success: false,
      status: this.status,
      message: this.message,
    };
  }

  // Bad request
  badRequest(message: string = "Bad request!") {
    return { success: false, message, status: 400 };
  }

  // Unauthorized
  unauthorized(message: string = "Unauthorized!") {
    return { success: false, message, status: 401 };
  }

  // Forbidden
  forbidden(message: string = "Forbidden!") {
    return { success: false, message, status: 403 };
  }

  // Not found
  notFound(message: string = "Not Found!") {
    return { success: false, message, status: 404 };
  }

  // Too many request
  tooManyRequest(message: string = "Too many request!") {
    return { success: false, message, status: 429 };
  }
}

export default ErrorHandler;
