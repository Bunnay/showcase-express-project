import PermissionGroup from "../models/permissionGroup";
import {
  CREATE_PERMISSION_GROUP_RULES,
  UPDATE_PERMISSION_GROUP_RULES,
} from "../validation/rules/permissionGroup";
import BaseController from "./baseController";
import PermissionGroupService from "../services/permissionGroupService";

const allowedQueryFields = {
  sort: ["id", "name"],
  search: ["name"],
  include: ["permissions"],
};

class PermissionGroupController extends BaseController<PermissionGroup> {
  constructor() {
    super(PermissionGroupService);

    this.create_rules = CREATE_PERMISSION_GROUP_RULES;
    this.update_rules = UPDATE_PERMISSION_GROUP_RULES;
    this.allowedQueryFields = allowedQueryFields;
  }
}

export default new PermissionGroupController();
