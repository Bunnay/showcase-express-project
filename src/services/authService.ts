import ErrorHandler from "../handlers/errorHandler";
import User, { CreateUser } from "../models/user";
import AuthProvider from "../providers/authProvider";
import { IResponseData } from "../types/api";
import SuccessHandler from "../handlers/successHandler";
import { LoginRequestData, LoginResponseData } from "../types/auth";
import AuthHandler from "../handlers/authHandler";

class AuthService {
  public authProvider;

  constructor() {
    this.authProvider = AuthProvider;
  }

  async register(userData: CreateUser): Promise<IResponseData<User>> {
    const user = await this.authProvider.register(userData);

    if (!user) {
      throw ErrorHandler.notFound();
    }

    const response = SuccessHandler.getCreatedData<User>(user);

    return response;
  }

  async login(
    loginData: LoginRequestData
  ): Promise<IResponseData<LoginResponseData>> {
    const loginInfo = await this.authProvider.login(loginData);

    const response = SuccessHandler.getLoginData<LoginResponseData>(loginInfo);

    return response;
  }

  async refreshToken(refresh_token: string) {
    const requestData = this.authProvider.refreshToken(refresh_token);

    if (!requestData) {
      throw Error("Refresh token is invalid or expired.");
    }

    const user = await User.findByPk(requestData?.user_id);

    if (!user) {
      throw ErrorHandler.notFound();
    }

    const access_token = AuthHandler.createToken(user.id);

    const dataForm = {
      user: user,
      access_token,
      refresh_token,
    };

    const response = SuccessHandler.getRefreshData<LoginResponseData>(dataForm);

    return response;
  }
}

export default new AuthService();
