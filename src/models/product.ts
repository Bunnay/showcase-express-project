import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";
import Category from "./category";

export interface CreateProduct extends Omit<Product, "id"> {}
export interface UpdateProduct extends Omit<Product, "id"> {}

class Product extends Model {
  private _id!: number;
  private _name!: string;
  private _category_id!: number;

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set category_id(category_id: number) {
    this._category_id = category_id;
  }
}

Product.init(
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
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "category",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    createdAt: "created_at",
    updatedAt: "updated_at",
    defaultScope: {
      attributes: { exclude: ["category_id"] },
    },
  }
);

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

export default Product;
