import Permission from "../models/permission";
import {
  CREATE_PERMISSION_RULES,
  UPDATE_PERMISSION_RULES,
} from "../validation/rules/permission";
import BaseController from "./baseController";
import PermissionService from "../services/permissionService";

const allowedQueryFields = {
  sort: ["id", "name"],
  search: ["name"],
  include: ["permissionGroup"],
};

class PermissionController extends BaseController<Permission> {
  constructor() {
    super(PermissionService);

    this.create_rules = CREATE_PERMISSION_RULES;
    this.update_rules = UPDATE_PERMISSION_RULES;
    this.allowedQueryFields = allowedQueryFields;
  }
}

export default new PermissionController();
