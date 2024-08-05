import Role from "../models/role";
import { CREATE_ROLE_RULES, UPDATE_ROLE_RULES } from "../validation/rules/role";
import BaseController from "./baseController";
import RoleService from "../services/roleService";

const allowedQueryFields = {
  sort: ["id", "name"],
  search: ["name"],
  include: ["permissions", "permissions.permissionGroup"],
};

class RoleController extends BaseController<Role> {
  constructor() {
    super(RoleService);

    this.create_rules = CREATE_ROLE_RULES;
    this.update_rules = UPDATE_ROLE_RULES;
    this.allowedQueryFields = allowedQueryFields;
  }
}

export default new RoleController();
