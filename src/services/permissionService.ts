import BaseService from "./baseService";
import Permission from "../models/permission";

class PermissionService extends BaseService<Permission> {
  constructor() {
    super(Permission);
  }
}

export default new PermissionService();
