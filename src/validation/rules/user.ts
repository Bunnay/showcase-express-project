export const CREATE_USER_RULES = {
  username: "required|string|unique:User.username",
  email: "required|email|unique:User.email",
  password: "required|string",
};

export const UPDATE_USER_RULES = {
  username: "required|string|unique:User.username",
  email: "required|email|unique:User.email",
};
