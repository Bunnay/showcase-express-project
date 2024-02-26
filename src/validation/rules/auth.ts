export const LOGIN_RULES = {
  username: "required|string",
  password: "required|string",
};

export const REGISTER_RULES = {
  username: "required|string|unique:User.username",
  email: "required|email|unique:User.email",
  password: "required|string",
};

export const REFRESH_RULES = {
  refresh_token: "required|string",
};
