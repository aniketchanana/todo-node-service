"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoEndpoints = exports.userEndpoints = void 0;
var userEndpoints;
(function (userEndpoints) {
    userEndpoints["root"] = "/auth";
    userEndpoints["signIn"] = "/signin";
    userEndpoints["signUp"] = "/signup";
    userEndpoints["logout"] = "/logout";
    userEndpoints["isValidSession"] = "/isValidSession";
})(userEndpoints = exports.userEndpoints || (exports.userEndpoints = {}));
var todoEndpoints;
(function (todoEndpoints) {
    todoEndpoints["root"] = "/todo";
    todoEndpoints["createNewList"] = "/createNewList";
    todoEndpoints["getUserTodoList"] = "/getUserTodoList";
    todoEndpoints["updateTodoList"] = "/updateTodoList";
    todoEndpoints["deleteTodoList"] = "/deleteTodoList";
    todoEndpoints["createTodoItem"] = "/createTodoItem";
    todoEndpoints["getUserTodoItem"] = "/getUserTodoItem";
    todoEndpoints["updateTodoItem"] = "/updateTodoItem";
    todoEndpoints["deleteTodoItem"] = "/deleteTodoItem";
})(todoEndpoints = exports.todoEndpoints || (exports.todoEndpoints = {}));
//# sourceMappingURL=routes.js.map