import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class AuthMiddleware {
  isAuthenticated(): boolean {
    return true;
  }

  checkRoles(roles: string[]): boolean {
    return true;
  }

  checkPermissions(permissions: string[]): boolean {
    return true;
  }
}

export default new AuthMiddleware();
