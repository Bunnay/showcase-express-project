import Category from "../models/category";
import {
  CREATE_CATEGORY_RULES,
  UPDATE_CATEGORY_RULES,
} from "../validation/rules/category";
import BaseController from "./baseController";
import CategoryService from "../services/categoryService";

const allowedQueryFields = {
  sort: ["id", "name"],
  search: ["name"],
  include: ["products"],
};

class CategoryController extends BaseController<Category> {
  constructor() {
    super(CategoryService);

    this.create_rules = CREATE_CATEGORY_RULES;
    this.update_rules = UPDATE_CATEGORY_RULES;
    this.allowedQueryFields = allowedQueryFields;
  }
}

export default new CategoryController();
