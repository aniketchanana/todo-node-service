"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dIContainer = void 0;
const inversify_1 = require("inversify");
const DiTypes_1 = require("./DiTypes");
const UserService_1 = require("./modules/user/service/UserService");
const UserRepository_1 = require("./modules/user/repository/UserRepository");
const UserController_1 = require("./modules/user/controller/UserController");
const TodoService_1 = require("./modules/todo/service/TodoService");
const TodoRepository_1 = require("./modules/todo/repository/TodoRepository");
const TodoController_1 = require("./modules/todo/controller/TodoController");
const TodoListTable_1 = require("./data/tables/TodoListTable");
const TodoItemTable_1 = require("./data/tables/TodoItemTable");
const UserTable_1 = require("./data/tables/UserTable");
const dIContainer = new inversify_1.Container();
exports.dIContainer = dIContainer;
// DB tables
dIContainer.bind(DiTypes_1.Types.USER_TABLE).to(UserTable_1.UserTable);
dIContainer
    .bind(DiTypes_1.Types.TODO_LIST_TABLE)
    .to(TodoListTable_1.TodoListTable);
dIContainer
    .bind(DiTypes_1.Types.TODO_ITEM_TABLE)
    .to(TodoItemTable_1.TodoItemTable);
// For auth service module
dIContainer.bind(DiTypes_1.Types.USER_SERVICE).to(UserService_1.UserService);
dIContainer.bind(DiTypes_1.Types.USER_REPOSITORY).to(UserRepository_1.UserRepository);
dIContainer.bind(DiTypes_1.Types.USER_CONTROLLER).to(UserController_1.UserController);
dIContainer.bind(DiTypes_1.Types.TODO_SERVICE).to(TodoService_1.TodoService);
dIContainer.bind(DiTypes_1.Types.TODO_REPOSITORY).to(TodoRepository_1.TodoRepository);
dIContainer.bind(DiTypes_1.Types.TODO_CONTROLLER).to(TodoController_1.TodoController);
//# sourceMappingURL=inversify.config.js.map