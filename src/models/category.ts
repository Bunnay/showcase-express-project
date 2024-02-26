import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

export interface CreateCategory extends Omit<Category, "id"> {}
export interface UpdateCategory extends Omit<Category, "id"> {}

class Category extends Model {
  private _id!: number;
  private _name!: string;

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }
}

Category.init(
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
    modelName: "Category",
    tableName: "categories",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Category;
