import BaseValidator from "validatorjs";
import ValidationError from "./validationError";
import { registerCustomValidator } from "./registerCustomValidator";

class Validator {
  // Validate
  async validate<T>(
    body: T,
    rules: Record<string, string>,
    customMessages?: Record<string, string>
  ): Promise<T> {
    const validation: BaseValidator.Validator<T> = new BaseValidator(
      body,
      rules,
      customMessages
    );

    registerCustomValidator();

    let passes = () => {};
    let fails = () => {};

    const promise = new Promise((resolve) => {
      passes = () => {
        resolve(true);
      };
      fails = () => {
        resolve(false);
      };
    });

    validation.checkAsync(passes, fails);

    const result = await promise;

    if (!result) {
      this.throwError<T>(validation);
    }

    return validation.input;
  }

  // Throw error when validation
  throwError<T>(validation: BaseValidator.Validator<T>) {
    throw new ValidationError<T>(validation).render();
  }
}

export default Validator;
