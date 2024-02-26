import ErrorHandler from "../handlers/errorHandler";
import User, { CreateUser } from "../models/user";
import AuthProvider from "../providers/authProvider";
import { IBaseErrorResponseData, IResponseData } from "../types/api";
import SuccessHandler from "../handlers/successHandler";
import { ILoginRequestData, ILoginResponseData } from "../types/auth";

class AuthService {
  public authProvider;

  constructor() {
    this.authProvider = AuthProvider;
  }

  // Register
  async register(userData: CreateUser): Promise<IResponseData<User>> {
    try {
      const user = await this.authProvider.register(userData);

      if (!user) {
        throw new ErrorHandler().notFound();
      }

      const response = SuccessHandler.getCreatedData<User>(user);

      return response;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }

  // Login
  async login(
    loginData: ILoginRequestData
  ): Promise<IResponseData<ILoginResponseData>> {
    try {
      const loginInfo = await this.authProvider.login(loginData);

      const response =
        SuccessHandler.getLoginData<ILoginResponseData>(loginInfo);

      return response;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }

  // Refresh token
  async refresh(refresh_token: string) {
    try {
      const response = await this.authProvider.refresh(refresh_token);

      const newResponse =
        SuccessHandler.getRefreshData<ILoginResponseData>(response);

      return newResponse;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }
}

export default new AuthService();
