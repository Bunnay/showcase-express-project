import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

export interface CreateNotification
  extends Omit<Notification, "id" | "read_at"> {}

export interface UpdateNotification
  extends Omit<Notification, "id" | "read_at"> {}

class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    createdAt: "created_at",
    updatedAt: "updated_at",
    defaultScope: {
      attributes: { exclude: ["user_id"] },
    },
    scopes: {
      withUserId: {
        attributes: { include: ["user_id"] },
      },
    },
  }
);

export default Notification;
