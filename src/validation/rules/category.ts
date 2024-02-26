export const CREATE_CATEGORY_RULES = {
  name: "required|string|unique:Category.name",
};

export const UPDATE_CATEGORY_RULES = {
  name: "required|string|unique:Category.name",
};
