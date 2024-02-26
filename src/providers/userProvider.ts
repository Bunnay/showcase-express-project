import QueryHandler from "../handlers/queryHandler";
import User, { CreateUser, UpdateUser } from "../models/user";
import { IQuery } from "../types/query";

const allowedQueryFields = {
  filter: ["id"],
  sort: ["id", "username"],
  search: ["username"],
  include: [
    "roles",
    "roles.permissions",
    "roles.permissions.group",
    "nationality",
  ],
};

class UserProvider {
  // Get all users
  async getAllUser(
    query: Partial<IQuery>
  ): Promise<{ total: number; users: User[] }> {
    const { count: total, rows: users } = await User.findAndCountAll(
      QueryHandler.processQueryParams(query, allowedQueryFields)
    );

    return { total, users };
  }

  //   Get current user
  async getCurrentUser(
    id: number,
    query: Partial<IQuery>
  ): Promise<User | null> {
    const user = await User.findByPk(
      id,
      QueryHandler.processQueryParams(query, allowedQueryFields)
    );

    return user;
  }

  //   Get user by id
  async getUserById(id: number, query: Partial<IQuery>): Promise<User | null> {
    const user = await User.findByPk(
      id,
      QueryHandler.processQueryParams(query, allowedQueryFields)
    );

    return user;
  }

  //   Create user
  async createUser(user: CreateUser): Promise<User | null> {
    const newUser = await User.create(user);

    const response = await User.findByPk(newUser.id);

    return response;
  }

  //   Update user
  async updateUser(id: number, updateData: UpdateUser): Promise<User | null> {
    const user = await User.findByPk(id);

    if (user) {
      await user.update(updateData);
      return user.save();
    }

    return null;
  }

  //   Delete user
  async deleteUser(id: number): Promise<User | null> {
    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();
      return user.save();
    }

    return null;
  }
}

export default new UserProvider();
