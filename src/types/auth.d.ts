import User from "../models/user";

export interface ILoginRequestData {
  username: string;
  password: string;
}

export interface ILoginResponseData {
  access_token: string;
  refresh_token: string;
  user: User;
}
