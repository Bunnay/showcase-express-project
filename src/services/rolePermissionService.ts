import PermissionGroup from "../models/permissionGroup";
import Role from "../models/role";
import PermissionGroupService from "./permissionGroupService";
import RoleService from "./roleService";
import PermissionService from "./permissionService";

class RolePermissionService {
  getDisplayName(): string {
    return "Role Permission";
  }

  // Get selected roles and permissions
  public async getSelectedRolesPermissions(
    role_ids: number[],
    group_ids: number[]
  ): Promise<{
    roleData: Role[];
    permissionGroupData: PermissionGroup[];
  }> {
    const roleData: Role[] = [];
    const permissionGroupData: PermissionGroup[] = [];

    for (const role_id of role_ids) {
      const role = await RoleService.findByIdOrFail(role_id);
      roleData.push(role);
    }

    for (const group_id of group_ids) {
      const permissionGroup = await PermissionGroupService.findByIdOrFail(
        group_id
      );
      permissionGroupData.push(permissionGroup);
    }

    return {
      roleData,
      permissionGroupData,
    };
  }

  // Assign roles permissions
  public async assignRolesPermissions(roles_permissions: any): Promise<void> {
    for (const rolePermission of roles_permissions) {
      const { role_id, permissions } = rolePermission;

      const role = await RoleService.findByIdOrFail(role_id);
      const allPermissionsToAdd = [];

      for (const permission of permissions) {
        const { group_id, permission_ids } = permission;

        // Find the permission group
        await PermissionGroupService.findByIdOrFail(group_id);

        // Find the permissions by their IDs
        const permissionsToAdd = await PermissionService.findAll({
          where: { id: permission_ids },
        });

        allPermissionsToAdd.push(...permissionsToAdd.data);
      }

      // Assign the permissions to the role
      await role.setPermissions(allPermissionsToAdd);
      await role.save();
    }

    return;
  }
}

export default new RolePermissionService();
