import ErrorHandler from "../handlers/errorHandler";
import User, { CreateUser, UpdateUser } from "../models/user";
import UserProvider from "../providers/userProvider";
import {
  IBaseErrorResponseData,
  IBaseResponseData,
  IPaginateResponseData,
  IResponseData,
} from "../types/api";
import { IQuery } from "../types/query";
import SuccessHandler from "../handlers/successHandler";

class UserService {
  public userProvider;

  constructor() {
    this.userProvider = UserProvider;
  }

  // Get all users
  async getAllUsers(
    query: Partial<IQuery>
  ): Promise<IPaginateResponseData<User[]>> {
    try {
      const { total, users } = await this.userProvider.getAllUser(query);

      const response = SuccessHandler.getAllDataWithPagination<User[]>(
        users,
        query,
        total
      );

      return response;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }

  // Get user by id
  async getUserById(
    id: number,
    query: Partial<IQuery>
  ): Promise<IResponseData<User>> {
    try {
      const user = await this.userProvider.getUserById(id, query);

      if (!user) {
        throw new ErrorHandler().notFound();
      }

      const response = SuccessHandler.getOneData<User>(user);

      return response;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }

  // Get current user
  async getCurrentUser(
    id: number,
    query: Partial<IQuery>
  ): Promise<IResponseData<User>> {
    try {
      const user = await this.userProvider.getCurrentUser(id, query);

      if (!user) {
        throw new ErrorHandler().notFound();
      }

      const response = SuccessHandler.getOneData<User>(user);

      return response;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }

  // Create user
  async createUser(userData: CreateUser): Promise<IResponseData<User>> {
    try {
      const user = await this.userProvider.createUser(userData);

      if (!user) {
        throw new ErrorHandler().notFound();
      }

      const response = SuccessHandler.getCreatedData<User>(user);

      return response;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }

  // Update user
  async updateUser(
    id: number,
    userData: UpdateUser
  ): Promise<IResponseData<User>> {
    try {
      const user = await this.userProvider.updateUser(id, userData);

      if (!user) {
        throw new ErrorHandler().notFound();
      }

      const response = SuccessHandler.getUpdatedData<User>(user);

      return response;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }

  // Delete user
  async deleteUser(id: number): Promise<IBaseResponseData> {
    try {
      const user = await this.userProvider.deleteUser(id);

      if (!user) {
        throw new ErrorHandler().notFound();
      }

      const response = SuccessHandler.getDeletedData();

      return response;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }
}

export default new UserService();
