import authHandler from "../handlers/authHandler";
import User, { CreateUser } from "../models/user";
import { ILoginRequestData, ILoginResponseData } from "../types/auth";

class AuthProvider {
  // Register user
  async register(user: CreateUser): Promise<User | null> {
    const newUser = await User.create(user);

    const response = await User.findByPk(newUser.id);

    return response;
  }

  //  Login
  async login(loginData: ILoginRequestData): Promise<ILoginResponseData> {
    const { username, password } = loginData;

    const response = await authHandler.validate(username, password);

    return response;
  }

  //  Refresh token
  refresh(refresh_token: string): Promise<ILoginResponseData> {
    const response = authHandler.refreshToken(refresh_token);

    return response;
  }
}

export default new AuthProvider();
