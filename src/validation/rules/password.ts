export const FORGOT_PASSWORD_RULES = {
  email: "required|email",
};

export const RESET_PASSWORD_RULES = {
  email: "required|email",
  password: "required|string",
  password_confirmation: "required|string",
  token: "required|string",
};
