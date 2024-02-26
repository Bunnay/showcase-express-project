declare module "express" {
  interface Request {
    user?: IUserInfo;
  }
}

export interface IUserInfo {
  user_id: number;
  iat: number | string;
  exp: number | string;
}
