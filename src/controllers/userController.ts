import { Request, Response } from "express";
import User from "../models/user";
import { ApiResponse } from "../utils/apiResponseBuilder";
import { RESPONSE_MESSAGES } from "../constants/apiResponseData";
import { CREATE_USER_RULES, UPDATE_USER_RULES } from "../validation/rules/user";
import { ErrorApiResponse } from "../models/apiResponse";
import Role from "../models/role";
import Notification from "../models/notification";
import BaseController from "./baseController";
import UserService from "../services/userService";
import QueryHelper from "../utils/queryHelper";

const allowedQueryFields = {
  filter: ["id"],
  sort: ["id", "username"],
  search: ["username"],
  include: [
    "roles",
    "roles.permissions",
    "roles.permissions.permissionGroup",
    "nationality",
  ],
};

class UserController extends BaseController<Role> {
  constructor() {
    super(UserService);

    this.create_rules = CREATE_USER_RULES;
    this.update_rules = UPDATE_USER_RULES;
    this.allowedQueryFields = allowedQueryFields;
  }

  // Get current user
  public async getCurrentUser(req: Request, res: Response) {
    try {
      const userInfo = await UserService.getCurrentUserInfoOrFail(req);

      const user = await UserService.findByIdOrFail(
        userInfo?.user_id,
        QueryHelper.processQueryParams(req.query, allowedQueryFields)
      );

      const successResponse = new ApiResponse<User>()
        .withData(user)
        .withMessage(RESPONSE_MESSAGES.SUCCESS)
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }

  // Assign user role
  public async assignUserRole(req: Request, res: Response) {
    try {
      const { role_ids } = req.body;
      const user_id: number = Number(req.params.id);

      await UserService.assignUserRole(user_id, role_ids);

      await Notification.create({
        user_id: Number(user_id),
        title: RESPONSE_MESSAGES.ASSIGNED,
        body: RESPONSE_MESSAGES.ASSIGNED,
      });

      const successResponse = new ApiResponse<User>()
        .withMessage(
          RESPONSE_MESSAGES.ASSIGNED(this.service.getModelDisplayName())
        )
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }
}

export default new UserController();
