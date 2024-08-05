export const RESPONSE_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  TOO_MANY_REQUEST: 429,
  UNPROCESSABLE_ENTITY: 422,
};

export const RESPONSE_MESSAGES = {
  // success
  SUCCESS: "Request successfully.",
  CREATED: (resource: string) => `${resource} was created successfully.`,
  UPDATED: (resource: string) => `${resource} was updated successfully.`,
  DELETED: (resource: string) => `${resource} was deleted successfully.`,
  ASSIGNED: (resource: string) => `${resource} was assigned successfully.`,

  // error
  NOT_FOUND: "Request not found.",
  BAD_REQUEST: "The request was invalid.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  FORBIDDEN: "You do not have permission to perform this action.",
  INTERNAL_SERVER_ERROR:
    "Something went wrong on our end. Please try again later.",
  TOO_MANY_REQUEST: "You have made too many requests in a short period.",
  UNPROCESSABLE_ENTITY: "The provided data is invalid.",
};
