import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import { LoginResponseData } from "../types/auth";
import { omitKeyFromObj } from "../utils/objHelper";

class AuthHandler {
  // Create token
  createToken(user_id: number, expires_in: string | number = "15m"): string {
    return jwt.sign({ user_id }, process.env.JWT_SECRET_TOKEN || "", {
      expiresIn: expires_in || "15m",
    });
  }

  // Verify token
  verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET_TOKEN || "");
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
  ): Promise<LoginResponseData> {
    const user = await User.scope("withPassword").findOne({
      where: {
        username: username || "",
      },
    });

    const userData: User | undefined = user?.toJSON();

    if (!userData || !this.checkPassword(password, userData.password)) {
      throw Error("Username or password is not correct");
    }

    const expires_in = process.env.ACCESS_TOKEN_EXPIRY || "1d";
    const access_token = this.createToken(userData.id, expires_in);
    const refresh_token = this.createToken(userData.id, expires_in);

    return {
      user: omitKeyFromObj("password", userData),
      access_token,
      refresh_token,
    };
  }
}

export default new AuthHandler();
