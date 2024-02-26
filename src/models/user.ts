import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";
import Role from "./role";
import Notification from "./notification";

export interface CreateUser extends Omit<User, "id"> {}
export interface UpdateUser extends Omit<User, "id" | "password"> {}

class User extends Model {
  private _id!: number;
  private _username!: string;
  private _password!: string;
  private _email!: string;

  set id(id: number) {
    this._id = id;
  }

  set username(username: string) {
    this._username = username;
  }

  set password(password: string) {
    this._password = password;
  }

  set email(email: string) {
    this._email = email;
  }
}

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
    email: {
      type: DataTypes.STRING,
      allowNull: true,
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

User.belongsToMany(Role, {
  through: "user_roles",
  as: "roles",
  foreignKey: "user_id",
  otherKey: "role_id",
});

Role.belongsToMany(User, {
  through: "user_roles",
  as: "users",
  foreignKey: "role_id",
  otherKey: "user_id",
});

User.belongsToMany(Notification, {
  through: "user_notifications",
  as: "notifications",
  foreignKey: "user_id",
  otherKey: "notification_id",
});

Notification.belongsToMany(User, {
  through: "user_notifications",
  as: "users",
  foreignKey: "notification_id",
  otherKey: "user_id",
});

export default User;
