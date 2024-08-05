import BaseService from "./baseService";
import Category from "../models/category";

class CategoryService extends BaseService<Category> {
  constructor() {
    super(Category);
  }
}

export default new CategoryService();
