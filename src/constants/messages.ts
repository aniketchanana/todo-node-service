export enum CommonMessages {
  SOMETHING_WENT_WRONG = "Something went wrong, please try again later.",
  INVALID_REQ_BODY = "invalid request json data, please check your request body.",
  UPDATED_RECORDS = "Updated records",
  UNABLE_TO_FETCH_RESULT = "Unable to fetch result",
  UNABLE_TO_UPDATE_RECORD = "Unable to update record",
  UNABLE_TO_ADD_RECORD = "unable to add record",
}
export enum AuthMessages {
  INVALID_CREDENTIALS = "Invalid emailId or password.",
  INVALID_USER = "Invalid user",
  UNABLE_TO_CREATE_NEW_USER = "Unable to create new user.",
  UNABLE_TO_SIGN_IN = "Unable to signIn.",
}

export enum TodoMessage {
  SUCCESSFULLY_CREATED_LIST = "Todo list created successfully",
  UNABLE_TO_CREATE_LIST = "Unable to create todoList",
  LIST_ID_IS_REQUIRED = "List id is required",
  REQUESTED_LIST_IS_NOT_AVAILABLE = "Requested todo list is not available",
}
