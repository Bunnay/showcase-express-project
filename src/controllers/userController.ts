import { Request, Response } from "express";
import { CreateUser, UpdateUser } from "../models/user";
import userService from "../services/userService";
import { IBaseResponseData } from "../types/api";
import ErrorHandler from "../handlers/errorHandler";
import AuthHandler from "../handlers/authHandler";
import { UserInfo } from "../types/express";

class UserController {
  // Get all users
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.getAllUsers(req.query);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const user_id: number = Number(req.params.id);

    try {
      const response = await userService.getUserById(user_id);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }

  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    const authorizedToken = req.header("Authorization") || "";

    const accessToken = authorizedToken.replace("Bearer ", "");

    const userInfo = AuthHandler.verifyToken(accessToken) as UserInfo;

    const user_id = userInfo.user_id;

    try {
      const response = await userService.getCurrentUser(user_id);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const userData: CreateUser = req.body;

    userData.password = AuthHandler.hashPassword(userData.password);

    try {
      const response = await userService.createUser(userData);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const user_id: number = Number(req.params.id);

    const userData: UpdateUser = req.body;

    try {
      const response = await userService.updateUser(user_id, userData);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const user_id: number = Number(req.params.id);

    try {
      const response = await userService.deleteUser(user_id);

      res.json(response);
    } catch (error) {
      const err = error as IBaseResponseData;

      ErrorHandler.handleError(res, err.message, err.status);
    }
  }
}

export default new UserController();
