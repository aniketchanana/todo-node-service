import express from "express";
import { todoEndpoints } from "../../constants/routes";
import { dIContainer } from "../../inversify.config";
import { Types } from "../../DiTypes";
import { ITodoController } from "./controller/TodoController";

export default function TodoRouter() {
  const router = express.Router();

  const todoControllerInstance = dIContainer.get<ITodoController>(
    Types.TODO_CONTROLLER
  );

  router.post(
    todoEndpoints.createNewList,
    todoControllerInstance.createNewList.bind(todoControllerInstance)
  );

  router.get(
    todoEndpoints.getUserTodoList,
    todoControllerInstance.getUserTodoList.bind(todoControllerInstance)
  );

  router.patch(
    todoEndpoints.updateTodoList,
    todoControllerInstance.updateUserTodoList.bind(todoControllerInstance)
  );

  router.delete(
    todoEndpoints.deleteTodoList,
    todoControllerInstance.deleteUserTodoList.bind(todoControllerInstance)
  );

  router.post(
    todoEndpoints.createTodoItem,
    todoControllerInstance.createNewTodoItem.bind(todoControllerInstance)
  );
  router.get(
    todoEndpoints.getUserTodoItem,
    todoControllerInstance.getUserTodoItem.bind(todoControllerInstance)
  );
  router.patch(
    todoEndpoints.updateTodoItem,
    todoControllerInstance.updateUserTodoItem.bind(todoControllerInstance)
  );
  router.delete(
    todoEndpoints.deleteTodoItem,
    todoControllerInstance.deleteUserTodoItem.bind(todoControllerInstance)
  );

  return router;
}
