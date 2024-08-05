import AuthHelper from "../../utils/authHelper";

export const seedUsers = async () => {
  return [
    {
      username: "admin",
      email: "admin@gmail.com",
      password: AuthHelper.hashPassword("password"),
    },
  ];
};
