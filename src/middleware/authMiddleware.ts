import { Request, Response, NextFunction } from "express";
import { ErrorApiResponse } from "../models/apiResponse";
import UserService from "../services/userService";
import Role from "../models/role";
import Permission from "../models/permission";

class AuthMiddleware {
  async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.getCurrentUserInfoOrFail(req);
      next();
    } catch (error) {
      ErrorApiResponse.handleError(ErrorApiResponse.Unauthorized(), res);
    }
  }

  checkRoles(roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userInfo = await UserService.getCurrentUserInfoOrFail(req);

        const user = await UserService.findByIdOrFail(userInfo.user_id, {
          include: {
            model: Role,
            as: "roles",
          },
        });

        const allRoles = user?.roles?.map((role: Role) => role.name) || [];

        if (roles.some((role: string) => allRoles.includes(role))) {
          next();
        } else {
          throw ErrorApiResponse.Forbidden();
        }
      } catch (error) {
        ErrorApiResponse.handleError(error, res);
      }
    };
  }

  checkPerms(perms: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userInfo = await UserService.getCurrentUserInfoOrFail(req);

        const user = await UserService.findByIdOrFail(userInfo.user_id, {
          include: {
            model: Role,
            as: "roles",
            include: [
              {
                model: Permission,
                as: "permissions",
              },
            ],
          },
        });

        const allRoles: Role[] = user?.roles || [];

        const allPermissions =
          allRoles?.map((role: Role) =>
            role.permissions?.map((perm: Permission) => perm.name)
          )[0] || [];

        if (perms.some((perm: string) => allPermissions.includes(perm))) {
          next();
        } else {
          throw ErrorApiResponse.Forbidden();
        }
      } catch (error) {
        ErrorApiResponse.handleError(error, res);
      }
    };
  }
}

export default new AuthMiddleware();
