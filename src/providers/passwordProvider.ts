import authHandler from "../handlers/authHandler";
import User from "../models/user";

class PasswordProvider {
  // Forgot password
  async forgotPassword(email: string) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const resetToken = authHandler.createToken(
        user.id,
        process.env.JWT_RESET_PASSWORD_SECRET,
        process.env.RESET_PASSWORD_TOKEN_EXPIRY
      );

      const resetLink = `${process.env.RESET_PASSWORD_LINK}?email=${email}&token=${resetToken}`;

      return {
        user: user,
        email: email,
        token: resetToken,
        link: resetLink,
      };
    }

    return null;
  }

  //   Reset password
  async resetPassword(
    email: string,
    password: string,
    password_confirmation: string,
    token: string
  ) {
    const user = await User.scope("withPassword").findOne({ where: { email } });

    if (
      user &&
      token &&
      password &&
      password_confirmation &&
      password == password_confirmation
    ) {
      const newHashedPassword = authHandler.hashPassword(password);
      user.password = newHashedPassword;

      await user.update(user);
      return await user.save();
    }

    return null;
  }
}

export default new PasswordProvider();
