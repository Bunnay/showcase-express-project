import { Request, Response } from "express";
import BaseService from "./baseService";
import User from "../models/user";
import RoleService from "./roleService";
import AuthHelper from "../utils/authHelper";
import { ErrorApiResponse } from "../models/apiResponse";

class UserService extends BaseService<User> {
  constructor() {
    super(User);

    this.assignUserRole = this.assignUserRole.bind(this);
  }

  // Get current user info
  async getCurrentUserInfoOrFail(req: Request) {
    const token = AuthHelper.extractToken(req);

    if (!token) {
      throw ErrorApiResponse.Unauthorized();
    }

    const userInfo = await AuthHelper.verifyToken(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    ).catch(() => {
      throw ErrorApiResponse.Unauthorized();
    });

    return userInfo;
  }

  // Assign roles to user
  async assignUserRole(user_id: number, role_ids: number[]): Promise<User> {
    const user = await this.findByIdOrFail(user_id);
    const allRolesToAdd = [];

    for (const role_id of role_ids) {
      const role = await RoleService.findByIdOrFail(role_id);
      allRolesToAdd.push(role);
    }

    await user.setRoles(allRolesToAdd);
    await user.save();

    return user;
  }
}

export default new UserService();
