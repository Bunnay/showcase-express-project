export const CREATE_USER_RULES = {
  name: "required|string",
  email: "required|email|unique:email",
};
