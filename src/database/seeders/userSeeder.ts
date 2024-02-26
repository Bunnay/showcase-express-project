import AuthHandler from "../../handlers/authHandler";

export const seedUsers = async () => {
  return [
    {
      username: "admin",
      email: "admin@gmail.com",
      password: AuthHandler.hashPassword("password"),
    },
  ];
};
