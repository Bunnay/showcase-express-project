import { Request, Response } from "express";
import { RESPONSE_MESSAGES } from "../constants/apiResponseData";
import { ApiResponse } from "../utils/apiResponseBuilder";
import { ErrorApiResponse } from "../models/apiResponse";
import RolePermissionService from "../services/rolePermissionService";

class RolePermissionController {
  // Get selected roles and permissions
  public async getSelectedRolesPermissions(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { role_ids, group_ids } = req.body;

      const { roleData, permissionGroupData } =
        await RolePermissionService.getSelectedRolesPermissions(
          role_ids,
          group_ids
        );

      const successResponse = new ApiResponse()
        .withData({
          roles: roleData,
          group_permissions: permissionGroupData,
        })
        .withMessage(RESPONSE_MESSAGES.SUCCESS)
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }

  // Assign roles permissions
  public async assignRolesPermissions(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { roles_permissions } = req.body;

      await RolePermissionService.assignRolesPermissions(roles_permissions);

      const successResponse = new ApiResponse()
        .withMessage(
          RESPONSE_MESSAGES.ASSIGNED(RolePermissionService.getDisplayName())
        )
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }
}

export default new RolePermissionController();
