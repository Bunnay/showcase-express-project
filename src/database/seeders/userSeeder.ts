import AuthHandler from "../../handlers/authHandler";

export const seedUsers = async () => {
  return [
    {
      username: "admin",
      password: AuthHandler.hashPassword("password"),
    },
  ];
};
