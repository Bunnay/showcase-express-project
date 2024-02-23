import { Response } from "express";
import { IBaseResponseData } from "../types/api";

class ErrorHandler extends Error {
  // handle error
  handleError(
    res: Response,
    message: string = "Internal Server Error!",
    status: number = 500
  ): Response {
    return res.status(status).json({ success: false, message, status });
  }

  // Bad request
  badRequest(message: string = "Bad request!"): IBaseResponseData {
    return { success: false, message, status: 400 };
  }

  // Unauthorized
  unauthorized(message: string = "Unauthorized!"): IBaseResponseData {
    return { success: false, message, status: 401 };
  }

  // Forbidden
  forbidden(message: string = "Forbidden!"): IBaseResponseData {
    return { success: false, message, status: 403 };
  }

  // Not found
  notFound(message: string = "Not Found!"): IBaseResponseData {
    return { success: false, message, status: 404 };
  }

  // Too many request
  tooManyRequest(message: string = "Too many request!"): IBaseResponseData {
    return { success: false, message, status: 429 };
  }
}

export default new ErrorHandler();
