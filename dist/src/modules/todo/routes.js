"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../../constants/routes");
const inversify_config_1 = require("../../inversify.config");
const DiTypes_1 = require("../../DiTypes");
function TodoRouter() {
    const router = express_1.default.Router();
    const todoControllerInstance = inversify_config_1.dIContainer.get(DiTypes_1.Types.TODO_CONTROLLER);
    router.post(routes_1.todoEndpoints.createNewList, todoControllerInstance.createNewList.bind(todoControllerInstance));
    router.get(routes_1.todoEndpoints.getUserTodoList, todoControllerInstance.getUserTodoList.bind(todoControllerInstance));
    router.patch(routes_1.todoEndpoints.updateTodoList, todoControllerInstance.updateUserTodoList.bind(todoControllerInstance));
    router.delete(routes_1.todoEndpoints.deleteTodoList, todoControllerInstance.deleteUserTodoList.bind(todoControllerInstance));
    router.post(routes_1.todoEndpoints.createTodoItem, todoControllerInstance.createNewTodoItem.bind(todoControllerInstance));
    router.get(routes_1.todoEndpoints.getUserTodoItem, todoControllerInstance.getUserTodoItem.bind(todoControllerInstance));
    router.patch(routes_1.todoEndpoints.updateTodoItem, todoControllerInstance.updateUserTodoItem.bind(todoControllerInstance));
    router.delete(routes_1.todoEndpoints.deleteTodoItem, todoControllerInstance.deleteUserTodoItem.bind(todoControllerInstance));
    return router;
}
exports.default = TodoRouter;
//# sourceMappingURL=routes.js.map