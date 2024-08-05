import Product from "../models/product";
import {
  CREATE_PRODUCT_RULES,
  UPDATE_PRODUCT_RULES,
} from "../validation/rules/product";
import BaseController from "./baseController";
import ProductService from "../services/productService";

const allowedQueryFields = {
  sort: ["id", "name"],
  search: ["name"],
  include: ["category"],
};

class ProductController extends BaseController<Product> {
  constructor() {
    super(ProductService);

    this.create_rules = CREATE_PRODUCT_RULES;
    this.update_rules = UPDATE_PRODUCT_RULES;
    this.allowedQueryFields = allowedQueryFields;
  }
}

export default new ProductController();
