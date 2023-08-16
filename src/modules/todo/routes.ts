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

  /**
   * This will get one list as per query params ?listId=...
   * ot all the todo lists at once
   */
  router.get(
    todoEndpoints.getUserTodoList,
    todoControllerInstance.getUserTodoList.bind(todoControllerInstance)
  );

  router.patch(
    todoEndpoints.updateTodoList,
    todoControllerInstance.updateUserTodoList.bind(todoControllerInstance)
  );
  return router;
}
