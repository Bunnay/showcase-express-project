import ErrorHandler from "../handlers/errorHandler";

class ValidationError<T> extends ErrorHandler {
  public validator: Validator.Validator<T>;
  public status: number;

  constructor(validator: Validator.Validator<T>) {
    super();
    this.validator = validator;
    this.status = 422;
  }

  render() {
    return {
      success: false,
      status: this.status,
      message: "Invalid data",
      errors: this.validator.errors.all(),
    };
  }
}

export default ValidationError;
