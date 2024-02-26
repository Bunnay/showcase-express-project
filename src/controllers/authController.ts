import { CreateUser } from "../models/user";
import authService from "../services/authService";
import AuthHandler from "../handlers/authHandler";
import { IBaseErrorResponseData } from "../types/api";
import { Request, Response } from "express";
import { ILoginRequestData } from "../types/auth";
import Validator from "./../validation/validator";
import {
  LOGIN_RULES,
  REFRESH_RULES,
  REGISTER_RULES,
} from "../validation/rules/auth";
const validator = new Validator();

class AuthController {
  // Register
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const registerUser: CreateUser = await validator.validate<CreateUser>(
        req.body,
        REGISTER_RULES
      );

      registerUser.password = AuthHandler.hashPassword(registerUser.password);

      const response = await authService.register(registerUser);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }

  // Login
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: ILoginRequestData =
        await validator.validate<ILoginRequestData>(req.body, LOGIN_RULES);

      const response = await authService.login(loginData);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }

  // Refresh
  public async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refresh_token }: { refresh_token: string } =
        await validator.validate<{ refresh_token: string }>(
          req.body,
          REFRESH_RULES
        );

      const response = await authService.refresh(refresh_token);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }
}

export default new AuthController();
