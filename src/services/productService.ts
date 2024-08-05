import BaseService from "./baseService";
import Product from "../models/product";

class ProductService extends BaseService<Product> {
  constructor() {
    super(Product);
  }
}

export default new ProductService();
