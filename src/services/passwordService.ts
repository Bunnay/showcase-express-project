import ErrorHandler from "../handlers/errorHandler";
import PasswordProvider from "../providers/passwordProvider";
import Template from "../mail/template";
import Mail from "../mail/mail";
import { IBaseErrorResponseData, IBaseResponseData } from "../types/api";
import SuccessHandler from "../handlers/successHandler";
import { Response } from "express";

class PasswordService {
  public passwordProvider;

  constructor() {
    this.passwordProvider = PasswordProvider;
  }

  //   Forgot password
  async forgotPassword(email: string) {
    try {
      const response = await this.passwordProvider.forgotPassword(email);

      if (!response) {
        throw new ErrorHandler().notFound();
      }

      const resetPasswordPath = Template.readHtmlFile(
        "../mail/templates/resetPassword.html"
      );

      const resetPasswordTemplate = new Template(resetPasswordPath);

      const data = {
        subject: "Forgot Password",
        username: response.user.username,
        text: "You have requested to reset your password. Click the link below to reset your password",
        link: response.link,
      };

      const renderedHtml = resetPasswordTemplate.render(data);

      const mail = new Mail({
        from: process.env.MAIL_FROM_ADDRESS,
        to: response.email,
        subject: "Forgot Password",
        html: renderedHtml,
      });

      return mail.send().then(() => {
        const returnData: IBaseResponseData =
          SuccessHandler.getForgotPasswordData();

        return returnData;
      });
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }

  //   Reset password
  async resetPassword(
    res: Response,
    email: string,
    password: string,
    password_confirmation: string,
    token: string
  ) {
    try {
      const response = await this.passwordProvider.resetPassword(
        email,
        password,
        password_confirmation,
        token
      );

      if (!response) {
        throw new ErrorHandler().render();
      }

      const returnData: IBaseResponseData =
        SuccessHandler.getResetPasswordData();

      return returnData;
    } catch (error) {
      throw new ErrorHandler(error as IBaseErrorResponseData).render();
    }
  }
}

export default new PasswordService();
