export const CREATE_PERMISSION_GROUP_RULES = {
  name: "required|string|unique:PermissionGroup.name",
};

export const UPDATE_PERMISSION_GROUP_RULES = {
  name: "required|string|unique:PermissionGroup.name",
};
