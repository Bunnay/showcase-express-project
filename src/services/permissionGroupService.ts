import BaseService from "./baseService";
import PermissionGroup from "../models/permissionGroup";

class PermissionGroupService extends BaseService<PermissionGroup> {
  constructor() {
    super(PermissionGroup);
  }
}

export default new PermissionGroupService();
