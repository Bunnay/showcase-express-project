import authHandler from "../handlers/authHandler";
import User, { CreateUser } from "../models/user";
import { LoginRequestData, LoginResponseData } from "../types/auth";
import { UserInfo } from "../types/express";

class AuthProvider {
  // Register user
  async register(user: CreateUser): Promise<User | null> {
    const newUser = await User.create(user);

    const response = await User.findByPk(newUser.id);

    return response;
  }

  //  Login
  async login(loginData: LoginRequestData): Promise<LoginResponseData> {
    const { username, password } = loginData;

    const response = await authHandler.validate(username, password);

    return response;
  }

  //  Login
  refreshToken(refresh_token: string): UserInfo {
    const decoded = authHandler.verifyToken(refresh_token) as UserInfo;

    return decoded;
  }
}

export default new AuthProvider();
