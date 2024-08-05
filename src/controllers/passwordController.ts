import { Request, Response } from "express";
import Template from "../mail/template";
import Mail from "../mail/mail";
import User from "../models/user";
import authHandler from "../utils/authHelper";
import {
  FORGOT_PASSWORD_RULES,
  RESET_PASSWORD_RULES,
} from "../validation/rules/password";
import { IResetPassword, IForgotPassword } from "password";
import Validator from "./../validation/validator";
import { ApiResponse } from "../utils/apiResponseBuilder";
import { RESPONSE_STATUS_CODES } from "../constants/apiResponseData";
import { AUTH_MESSAGES } from "../constants/authData";
import { ErrorApiResponse } from "../models/apiResponse";
import UserService from "../services/userService";

const validator = new Validator();

class PasswordController {
  // Forgot password
  public async forgotPassword(req: Request, res: Response) {
    try {
      const { email }: IForgotPassword =
        await validator.validate<IForgotPassword>(
          req.body,
          FORGOT_PASSWORD_RULES
        );

      const user = await UserService.findOneOrFail({ where: { email } });

      const resetToken = authHandler.createToken(
        user.toJSON().id,
        process.env.JWT_RESET_PASSWORD_SECRET,
        process.env.RESET_PASSWORD_TOKEN_EXPIRY
      );

      const resetLink = `${process.env.RESET_PASSWORD_LINK}?email=${email}&token=${resetToken}`;

      const resetPasswordPath = Template.readHtmlFile(
        "../mail/templates/resetPassword.html"
      );

      const data = {
        subject: "Forgot Password",
        username: user.toJSON().username,
        text: "You have requested to reset your password. Click the link below to reset your password",
        link: resetLink,
      };

      const resetPasswordTemplate = new Template(resetPasswordPath);
      const renderedHtml = resetPasswordTemplate.render(data);

      const mail = new Mail({
        from: process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: "Forgot Password",
        html: renderedHtml,
      });

      return mail.send().then(() => {
        const successResponse = new ApiResponse()
          .withMessage(AUTH_MESSAGES.FORGOT_PASSWORD_SUCCESS)
          .BuildSuccessResponse();

        res.json(successResponse);
      });
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
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

      const user = await UserService.findOneOrFail({
        where: { email },
        scope: "withPassword",
      });

      if (password != password_confirmation) {
        throw new ApiResponse()
          .withStatusCode(RESPONSE_STATUS_CODES.UNPROCESSABLE_ENTITY)
          .withMessage("Password and password confirmation must be the same.")
          .BuildErrorResponse();
      }

      const newHashedPassword = authHandler.hashPassword(password);
      user.toJSON().password = newHashedPassword;

      await user.update(user);
      await user.save();

      const successResponse = new ApiResponse()
        .withMessage(AUTH_MESSAGES.RESET_PASSWORD_SUCCESS)
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }
}

export default new PasswordController();
