import User, { CreateUser } from "../models/user";
import authService from "../services/authService";
import AuthHandler from "../handlers/authHandler";
import ErrorHandler from "../handlers/errorHandler";
import { IBaseResponseData } from "../types/api";
import { Request, Response } from "express";
import { LoginRequestData } from "../types/auth";

class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    const registerUser: CreateUser = req.body;

    registerUser.password = AuthHandler.hashPassword(registerUser.password);

    try {
      const response = await authService.register(registerUser);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const loginData: LoginRequestData = req.body;

    try {
      const response = await authService.login(loginData);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<void> {
    const refresh_token: string = req.body.refresh_token;

    try {
      const response = await authService.refreshToken(refresh_token);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }
}

export default new AuthController();
