declare module "password" {
  export interface IForgotPassword {
    email: string;
  }

  export interface IResetPassword {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
  }
}
