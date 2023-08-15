import express from "express";
import { todoEndpoints } from "../../constants/routes";
import { dIContainer } from "../../inversify.config";
import { Types } from "../../DiTypes";
import { ITodoListController } from "./controller/TodoListController";

export default function TodoRouter() {
  const router = express.Router();
  const todoListControllerInstance = dIContainer.get<ITodoListController>(
    Types.TODO_LIST_CONTROLLER
  );

  router.post(
    todoEndpoints.createNewList,
    todoListControllerInstance.createNewList.bind(todoListControllerInstance)
  );

  return router;
}
