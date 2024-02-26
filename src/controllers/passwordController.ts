import passwordService from "../services/passwordService";
import { IBaseErrorResponseData } from "../types/api";
import { Request, Response } from "express";
import {
  FORGOT_PASSWORD_RULES,
  RESET_PASSWORD_RULES,
} from "../validation/rules/password";
import { IResetPassword, IForgotPassword } from "password";
import Validator from "./../validation/validator";
const validator = new Validator();

class PasswordController {
  // Forgot password
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email }: IForgotPassword =
        await validator.validate<IForgotPassword>(
          req.body,
          FORGOT_PASSWORD_RULES
        );

      const response = await passwordService.forgotPassword(email);

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }

  //   Reset password
  public async resetPassword(req: Request, res: Response) {
    try {
      const { email, password, password_confirmation, token }: IResetPassword =
        await validator.validate<IResetPassword>(
          req.body,
          RESET_PASSWORD_RULES
        );

      const response = await passwordService.resetPassword(
        res,
        email,
        password,
        password_confirmation,
        token
      );

      res.json(response);
    } catch (error) {
      res.status((error as IBaseErrorResponseData).status).json(error);
    }
  }
}

export default new PasswordController();
