declare module "express" {
  interface Request {
    user?: UserInfo;
  }
}

export interface UserInfo {
  user_id: number;
  iat: number | string;
  exp: number | string;
}
