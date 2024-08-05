import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
} from "../constants/apiResponseData";
import { ApiResponse } from "../utils/apiResponseBuilder";

class ValidationError<T> {
  public validator: Validator.Validator<T>;
  public status_code: number;

  constructor(validator: Validator.Validator<T>) {
    this.validator = validator;
    this.status_code = RESPONSE_STATUS_CODES.UNPROCESSABLE_ENTITY;
  }

  render() {
    return new ApiResponse()
      .withStatusCode(this.status_code)
      .withMessage(RESPONSE_MESSAGES.UNPROCESSABLE_ENTITY)
      .withError(this.validator.errors.all())
      .BuildErrorResponse();
  }
}

export default ValidationError;
