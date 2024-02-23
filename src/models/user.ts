import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

export interface CreateUser extends Omit<User, "id"> {}
export interface UpdateUser extends Omit<User, "id" | "password"> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password"] },
      },
    },
  }
);

export default User;
