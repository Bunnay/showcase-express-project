import Validator from "validatorjs";
import sequelize from "../database/sequelize";
import { Op } from "sequelize";

export const registerCustomValidator = () => {
  Validator.register(
    "lowercase",
    (value) => {
      return value === (value as string).toLowerCase();
    },
    "The :attribute must be all lowercase."
  );

  Validator.register(
    "uppercase",
    (value) => {
      return value === (value as string).toUpperCase();
    },
    "The :attribute must be all uppercase."
  );

  Validator.register(
    "object",
    (value) => {
      return (
        typeof value === "object" && !Array.isArray(value) && value !== null
      );
    },
    "The :attribute must be an object."
  );

  Validator.registerAsync(
    "unique",
    async (
      value: number | string | boolean,
      attribute: string,
      req: any,
      passes: (success: boolean, message?: string) => void
    ) => {
      let [modelName, att, id] = attribute.split(".");
      let model = sequelize.models[modelName];
      let whereClause: any = { [att]: value };

      if (id) {
        whereClause.id = { [Op.ne]: id };
      }

      const count: number = await model.count({
        where: whereClause,
      });

      if (count === 0) {
        return passes(true);
      }

      return passes(false, `The ${att} has already been taken.`);
    },

    "The :attribute has already been taken."
  );
};
