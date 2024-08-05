import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";
import Permission from "./permission";

export interface CreateRole extends Omit<Role, "id"> {}
export interface UpdateRole extends Omit<Role, "id"> {}

class Role extends Model {
  [propName: string]: any;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: false,
  }
);

Role.belongsToMany(Permission, {
  through: "role_permissions",
  as: "permissions",
  foreignKey: "role_id",
  otherKey: "permission_id",
});

Permission.belongsToMany(Role, {
  through: "role_permissions",
  as: "roles",
  foreignKey: "permission_id",
  otherKey: "role_id",
});

export default Role;
