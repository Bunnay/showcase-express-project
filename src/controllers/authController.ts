import { ILoginRequestData, ILoginResponseData } from "../types/auth";
import AuthHelper from "../utils/authHelper";
import Validator from "./../validation/validator";
import { NextFunction, Request, Response } from "express";
import { LOGIN_RULES, REFRESH_RULES } from "../validation/rules/auth";
import { ApiResponse } from "../utils/apiResponseBuilder";
import { AUTH_MESSAGES } from "../constants/authData";
import { ErrorApiResponse } from "../models/apiResponse";

const validator = new Validator();

class AuthController {
  // Login user
  public async login(req: Request, res: Response) {
    try {
      const loginData: ILoginRequestData =
        await validator.validate<ILoginRequestData>(req.body, LOGIN_RULES);

      const response = await AuthHelper.validate(
        loginData.username,
        loginData.password
      );

      const successResponse = new ApiResponse<ILoginResponseData>()
        .withData(response)
        .withMessage(AUTH_MESSAGES.LOGIN_SUCCESS)
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }

  // Refresh token
  public async refresh(req: Request, res: Response) {
    try {
      const { refresh_token }: { refresh_token: string } =
        await validator.validate<{ refresh_token: string }>(
          req.body,
          REFRESH_RULES
        );

      const response = await AuthHelper.refreshToken(refresh_token);

      const successResponse = new ApiResponse<ILoginResponseData>()
        .withData(response)
        .withMessage(AUTH_MESSAGES.REFRESH_TOKEN_SUCCESS)
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }
}

export default new AuthController();
