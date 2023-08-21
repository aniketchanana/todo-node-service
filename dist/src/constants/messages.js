"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoMessage = exports.AuthMessages = exports.CommonMessages = void 0;
var CommonMessages;
(function (CommonMessages) {
    CommonMessages["SOMETHING_WENT_WRONG"] = "Something went wrong, please try again later.";
    CommonMessages["INVALID_REQ_BODY"] = "invalid request json data, please check your request body.";
    CommonMessages["UPDATED_RECORDS"] = "Updated records";
    CommonMessages["UNABLE_TO_FETCH_RESULT"] = "Unable to fetch result";
    CommonMessages["UNABLE_TO_UPDATE_RECORD"] = "Unable to update record";
    CommonMessages["UNABLE_TO_ADD_RECORD"] = "unable to add record";
})(CommonMessages = exports.CommonMessages || (exports.CommonMessages = {}));
var AuthMessages;
(function (AuthMessages) {
    AuthMessages["INVALID_CREDENTIALS"] = "Invalid emailId or password.";
    AuthMessages["INVALID_USER"] = "Invalid user";
    AuthMessages["UNABLE_TO_CREATE_NEW_USER"] = "Unable to create new user.";
    AuthMessages["UNABLE_TO_SIGN_IN"] = "Unable to signIn.";
})(AuthMessages = exports.AuthMessages || (exports.AuthMessages = {}));
var TodoMessage;
(function (TodoMessage) {
    TodoMessage["SUCCESSFULLY_CREATED_LIST"] = "Todo list created successfully";
    TodoMessage["UNABLE_TO_CREATE_LIST"] = "Unable to create todoList";
    TodoMessage["LIST_ID_IS_REQUIRED"] = "List id is required";
    TodoMessage["REQUESTED_LIST_IS_NOT_AVAILABLE"] = "Requested todo list is not available";
})(TodoMessage = exports.TodoMessage || (exports.TodoMessage = {}));
//# sourceMappingURL=messages.js.map