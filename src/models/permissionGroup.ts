import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

export interface CreatePermissionGroup extends Omit<PermissionGroup, "id"> {}
export interface UpdatePermissionGroup extends Omit<PermissionGroup, "id"> {}

class PermissionGroup extends Model {
  private _id!: number;
  private _name!: string;

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }
}

PermissionGroup.init(
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
    modelName: "PermissionGroup",
    tableName: "permission_groups",
    timestamps: false,
  }
);

export default PermissionGroup;
