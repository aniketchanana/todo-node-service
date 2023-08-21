"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteTodoItemRequest = exports.validateUpdateTodoItemRequest = exports.validateCreateTodoItemRequest = exports.validateDeleteTodoLisRequest = exports.validateTodoListUpdateRequest = exports.getTodoListRequest = exports.validateCreateNewListRequest = void 0;
const yup_1 = require("yup");
exports.validateCreateNewListRequest = (0, yup_1.object)({
    listName: (0, yup_1.string)().required(),
});
exports.getTodoListRequest = (0, yup_1.object)({
    listId: (0, yup_1.string)(),
});
exports.validateTodoListUpdateRequest = (0, yup_1.object)({
    updates: (0, yup_1.object)({
        name: (0, yup_1.string)(),
    }).required(),
    listId: (0, yup_1.string)().required(),
}).required();
exports.validateDeleteTodoLisRequest = (0, yup_1.object)({
    listId: (0, yup_1.string)().required(),
}).required();
exports.validateCreateTodoItemRequest = (0, yup_1.object)({
    text: (0, yup_1.string)().required(),
    listId: (0, yup_1.string)().required(),
}).required();
exports.validateUpdateTodoItemRequest = (0, yup_1.object)({
    updates: (0, yup_1.object)({
        text: (0, yup_1.string)(),
    }).required(),
    listId: (0, yup_1.string)().required(),
    todoId: (0, yup_1.string)().required(),
}).required();
exports.validateDeleteTodoItemRequest = (0, yup_1.object)({
    listId: (0, yup_1.string)().required(),
    todoId: (0, yup_1.string)().required(),
}).required();
//# sourceMappingURL=reqValidations.js.map