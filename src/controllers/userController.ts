import { Request, Response } from "express";
import { CreateUser, UpdateUser } from "../models/user";
import userService from "../services/userService";
import { IBaseErrorResponseData } from "../types/api";
import AuthHandler from "../handlers/authHandler";
import { IUserInfo } from "../types/express";
import { CREATE_USER_RULES, UPDATE_USER_RULES } from "../validation/rules/user";
import Validator from "./../validation/validator";
const validator = new Validator();

class UserController {
  // Get all users
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.getAllUsers(req.query);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }

  // Get user by id
  public async getUserById(req: Request, res: Response): Promise<void> {
    const user_id: number = Number(req.params.id);

    try {
      const response = await userService.getUserById(user_id, req.query);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }

  // Get current user
  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    const authorizedToken = req.header("Authorization") || "";
    const accessToken = authorizedToken.replace("Bearer ", "");
    const userInfo = AuthHandler.verifyToken(
      accessToken,
      process.env.JWT_SECRET_ACCESS_TOKEN
    ) as IUserInfo;
    const user_id = userInfo.user_id;

    try {
      const response = await userService.getCurrentUser(user_id, req.query);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }

  // Create user
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUser = await validator.validate<CreateUser>(
        req.body,
        CREATE_USER_RULES
      );

      userData.password = AuthHandler.hashPassword(userData.password);

      const response = await userService.createUser(userData);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }

  // Update user
  public async updateUser(req: Request, res: Response): Promise<void> {
    const user_id: number = Number(req.params.id);

    try {
      const userData: UpdateUser = await validator.validate<UpdateUser>(
        req.body,
        UPDATE_USER_RULES
      );

      const response = await userService.updateUser(user_id, userData);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }

  // Delete user
  public async deleteUser(req: Request, res: Response): Promise<void> {
    const user_id: number = Number(req.params.id);

    try {
      const response = await userService.deleteUser(user_id);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }
}

export default new UserController();
