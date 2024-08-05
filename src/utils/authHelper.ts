import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user";
import { ILoginResponseData } from "../types/auth";
import { IUserInfo } from "../types/express";
import { omitKeyFromObj } from "./objHelper";
import { AUTH_MESSAGES } from "../constants/authData";
import { ApiResponse } from "./apiResponseBuilder";
import { RESPONSE_STATUS_CODES } from "../constants/apiResponseData";
import UserService from "../services/userService";

class AuthHelper {
  // Create token
  createToken(
    user_id: number,
    secret_key: string | undefined,
    expires_in: string | number = "15m"
  ): string {
    return jwt.sign({ user_id }, secret_key || "", {
      expiresIn: expires_in,
    });
  }

  // Get valid token
  extractToken(req: Request): string | null {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return null;
    }
    const tokenMatch = authorizationHeader.match(/^Bearer\s(.+)$/);
    return tokenMatch ? tokenMatch[1] : null;
  }

  // Hash password
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 16);
  }

  // Check password
  checkPassword(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword || "", hashedPassword || "");
  }

  // Verify token
  async verifyToken(
    token: string,
    secret_key: string | undefined
  ): Promise<IUserInfo> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret_key as string, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user as IUserInfo);
        }
      });
    });
  }

  // User validation
  async validate(
    username: string,
    password: string
  ): Promise<ILoginResponseData> {
    const user = await User.scope("withPassword").findOne({
      where: {
        username: username || "",
      },
    });

    if (
      !user?.toJSON() ||
      !this.checkPassword(password, user?.toJSON().password)
    ) {
      const errorResponse = new ApiResponse()
        .withStatusCode(RESPONSE_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .withMessage(AUTH_MESSAGES.LOGIN_ERROR)
        .BuildErrorResponse();

      throw errorResponse;
    }

    const access_token = this.createToken(
      user.toJSON().id,
      process.env.JWT_SECRET_ACCESS_TOKEN,
      process.env.ACCESS_TOKEN_EXPIRY || "15m"
    );

    const refresh_token = this.createToken(
      user.toJSON().id,
      process.env.JWT_SECRET_REFRESH_TOKEN,
      process.env.REFRESH_TOKEN_EXPIRY || "7d"
    );

    return {
      user: omitKeyFromObj("password", user.get()),
      access_token,
      refresh_token,
    };
  }

  // Refresh token and get new access token
  async refreshToken(refresh_token: string): Promise<ILoginResponseData> {
    const decoded = await this.verifyToken(
      refresh_token,
      process.env.JWT_SECRET_REFRESH_TOKEN
    );

    if (!decoded) {
      throw Error(AUTH_MESSAGES.REFRESH_TOKEN_ERROR);
    }

    const user = await UserService.findByIdOrFail(decoded?.user_id);

    const access_token = this.createToken(
      user.toJSON().id,
      process.env.JWT_SECRET_ACCESS_TOKEN,
      process.env.ACCESS_TOKEN_EXPIRY || "15m"
    );

    const response = {
      user: omitKeyFromObj("password", user.get()),
      access_token,
      refresh_token,
    };

    return response;
  }
}

export default new AuthHelper();
