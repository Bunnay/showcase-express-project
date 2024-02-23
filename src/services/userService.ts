import ErrorHandler from "../handlers/errorHandler";
import User, { CreateUser, UpdateUser } from "../models/user";
import UserProvider from "../providers/userProvider";
import {
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

  async getAllUsers(
    query: Partial<IQuery>
  ): Promise<IPaginateResponseData<User[]>> {
    const { total, users } = await this.userProvider.getAllUser();

    const response = SuccessHandler.getAllDataWithPagination<User[]>(
      users,
      query,
      total
    );

    return response;
  }

  async getUserById(id: number): Promise<IResponseData<User>> {
    const user = await this.userProvider.getUserById(id);

    if (!user) {
      throw ErrorHandler.notFound();
    }

    const response = SuccessHandler.getOneData<User>(user);

    return response;
  }

  async getCurrentUser(id: number): Promise<IResponseData<User>> {
    const user = await this.userProvider.getCurrentUser(id);

    if (!user) {
      throw ErrorHandler.notFound();
    }

    const response = SuccessHandler.getOneData<User>(user);

    return response;
  }

  async createUser(userData: CreateUser): Promise<IResponseData<User>> {
    const user = await this.userProvider.createUser(userData);

    if (!user) {
      throw ErrorHandler.notFound();
    }

    const response = SuccessHandler.getCreatedData<User>(user);

    return response;
  }

  async updateUser(
    id: number,
    userData: UpdateUser
  ): Promise<IResponseData<User>> {
    const user = await this.userProvider.updateUser(id, userData);

    if (!user) {
      throw ErrorHandler.notFound();
    }

    const response = SuccessHandler.getUpdatedData<User>(user);

    return response;
  }

  async deleteUser(id: number): Promise<IBaseResponseData> {
    const user = await this.userProvider.deleteUser(id);

    if (!user) {
      throw ErrorHandler.notFound();
    }

    const response = SuccessHandler.getDeletedData();

    return response;
  }
}

export default new UserService();
