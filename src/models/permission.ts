import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";
import PermissionGroup from "./permissionGroup";

export interface CreatePermission extends Omit<Permission, "id"> {}
export interface UpdatePermission extends Omit<Permission, "id"> {}

class Permission extends Model {
  private _id!: number;
  private _name!: string;
  private _group_id!: string;

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set group_id(group_id: string) {
    this._group_id = group_id;
  }
}

Permission.init(
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
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "permission_groups",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions",
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["group_id"] },
    },
  }
);

Permission.belongsTo(PermissionGroup, {
  foreignKey: "group_id",
  as: "group",
});

PermissionGroup.hasMany(Permission, {
  foreignKey: "group_id",
  as: "permissions",
});

export default Permission;
