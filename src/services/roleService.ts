import BaseService from "./baseService";
import Role from "../models/role";

class RoleService extends BaseService<Role> {
  constructor() {
    super(Role);
  }
}

export default new RoleService();
