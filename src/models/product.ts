import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";
import Category from "./category";

export interface CreateProduct extends Omit<Product, "id"> {}
export interface UpdateProduct extends Omit<Product, "id"> {}

class Product extends Model {}

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
      allowNull: true,
      references: {
        model: "categories",
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
