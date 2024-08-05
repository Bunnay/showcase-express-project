export const CREATE_PERMISSION_RULES = {
  name: "required|string|unique:Permission.name",
  group_id: "required|integer",
};

export const UPDATE_PERMISSION_RULES = {
  name: "required|string|unique:Permission.name",
  group_id: "required|integer",
};
