export const CREATE_PRODUCT_RULES = {
  name: "required|string|unique:Product.name",
  category_id: "integer",
};

export const UPDATE_PRODUCT_RULES = {
  name: "required|string|unique:Product.name",
  category_id: "integer",
};
