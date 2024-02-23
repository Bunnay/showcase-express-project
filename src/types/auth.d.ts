import User from "../models/user";

export interface LoginRequestData {
  username: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  user: User;
}
