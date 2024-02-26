import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import { ILoginResponseData } from "../types/auth";
import { omitKeyFromObj } from "../utils/objHelper";
import { IUserInfo } from "../types/express";
import ErrorHandler from "../handlers/errorHandler";

class AuthHandler {
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

  // Verify token
  verifyToken(
    token: string,
    secret_key: string | undefined
  ): string | JwtPayload {
    return jwt.verify(token, secret_key || "");
  }

  // Hash password
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 16);
  }

  // Check password
  checkPassword(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword || "", hashedPassword || "");
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

    const userData: User | undefined = user?.toJSON();

    if (!userData || !this.checkPassword(password, userData.password)) {
      throw Error("Username or password is not correct");
    }

    const access_token = this.createToken(
      userData.id,
      process.env.JWT_SECRET_ACCESS_TOKEN,
      process.env.ACCESS_TOKEN_EXPIRY || "15m"
    );

    const refresh_token = this.createToken(
      userData.id,
      process.env.JWT_SECRET_REFRESH_TOKEN,
      process.env.REFRESH_TOKEN_EXPIRY || "7d"
    );

    return {
      user: omitKeyFromObj("password", userData),
      access_token,
      refresh_token,
    };
  }

  // Refresh token and get new access token
  async refreshToken(refresh_token: string): Promise<ILoginResponseData> {
    const decoded = this.verifyToken(
      refresh_token,
      process.env.JWT_SECRET_REFRESH_TOKEN
    ) as IUserInfo;

    if (!decoded) {
      throw Error("Refresh token is invalid or expired.");
    }

    const user = await User.findByPk(decoded?.user_id);

    if (!user) {
      throw new ErrorHandler().notFound();
    }

    const access_token = this.createToken(
      user.id,
      process.env.JWT_SECRET_ACCESS_TOKEN,
      process.env.ACCESS_TOKEN_EXPIRY || "15m"
    );

    const response = {
      user: user,
      access_token,
      refresh_token,
    };

    return response;
  }
}

export default new AuthHandler();
