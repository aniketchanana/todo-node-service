import { Response } from "express";
import { AuthenticatedRequest } from "../../../common/types";
import { inject, injectable } from "inversify";
import { Types } from "../../../DiTypes";
import { ITodoService } from "../service/TodoService";
import {
  validateCreateNewListRequest,
  validateCreateTodoItemRequest,
  validateDeleteTodoItemRequest,
  validateDeleteTodoLisRequest,
  validateTodoListUpdateRequest,
  validateUpdateTodoItemRequest,
} from "./reqValidations";
import { StatusCode } from "../../../constants/statusCode";
import { CommonMessages, TodoMessage } from "../../../constants/messages";
import { get } from "lodash";
import { isUpdateAllowed } from "../../../utils";

export interface ITodoController {
  createNewList: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
  getUserTodoList: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
  updateUserTodoList: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
  deleteUserTodoList: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;

  createNewTodoItem: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
  getUserTodoItem: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
  updateUserTodoItem: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
  deleteUserTodoItem: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
}

@injectable()
export class TodoController implements ITodoController {
  @inject(Types.TODO_SERVICE) private todoService: ITodoService;

  public async createNewList(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    const { body: newListParameters } = req;
    try {
      await validateCreateNewListRequest
        .noUnknown()
        .validate(newListParameters);
    } catch (e) {
      return res.status(StatusCode.BAD_REQUEST).json({
        title: e.message,
        description: CommonMessages.INVALID_REQ_BODY,
      });
    }

    try {
      const { listName } = newListParameters;
      const user = req.user;
      const newList = await this.todoService.createNewList(listName, user.uuid);

      return res.status(StatusCode.RESOURCE_CREATED).json({
        title: TodoMessage.SUCCESSFULLY_CREATED_LIST,
        data: {
          listDetails: newList,
        },
      });
    } catch (e) {
      res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: TodoMessage.UNABLE_TO_CREATE_LIST,
      });
    }
  }

  public async getUserTodoList(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const { user, query } = req;
      let listId = get(query, "listId", null);

      const allTodoList = await this.todoService.getUserTodoList(
        user.uuid,
        listId
      );

      return res.status(StatusCode.SUCCESS).json({
        data: {
          allList: allTodoList,
        },
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: CommonMessages.UNABLE_TO_FETCH_RESULT,
      });
    }
  }

  public async updateUserTodoList(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    try {
      await validateTodoListUpdateRequest
        .noUnknown()
        .validate(get(req, "body"));
    } catch (e) {
      return res.status(StatusCode.BAD_REQUEST).json({
        title: e.message,
        description: CommonMessages.INVALID_REQ_BODY,
      });
    }
    try {
      const userId = get(req, "user.uuid");
      const listId = get(req, "body.listId");
      const updates = get(req, "body.updates");

      await this.todoService.updateUserTodoList(userId, listId, updates);

      res.status(StatusCode.SUCCESS).json({
        success: true,
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: CommonMessages.UNABLE_TO_UPDATE_RECORD,
      });
    }
  }

  public async deleteUserTodoList(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    try {
      await validateDeleteTodoLisRequest.validate(get(req, "body"));
    } catch (e) {
      return res.status(StatusCode.BAD_REQUEST).json({
        title: e.message,
        description: CommonMessages.INVALID_REQ_BODY,
      });
    }

    try {
      const userId = get(req, "user.uuid");
      const listId = get(req, "body.listId");

      await this.todoService.updateUserTodoList(userId, listId, {
        isDeleted: true,
      });
      res.status(StatusCode.SUCCESS).json({
        success: true,
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: CommonMessages.UNABLE_TO_UPDATE_RECORD,
      });
    }
  }

  public async createNewTodoItem(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    const reqBody = get(req, "body");
    try {
      await validateCreateTodoItemRequest.validate(reqBody);
    } catch (e) {
      return res.status(StatusCode.BAD_REQUEST).json({
        title: e.message,
        description: CommonMessages.INVALID_REQ_BODY,
      });
    }

    try {
      const { text, listId } = reqBody;
      const { uuid: userId } = req.user;
      const newlyAddedTodoItem = this.todoService.createNewTodoItem(
        text,
        listId,
        userId
      );
      res.status(StatusCode.RESOURCE_CREATED).json({
        data: newlyAddedTodoItem,
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: CommonMessages.UNABLE_TO_ADD_RECORD,
      });
    }
  }

  public async getUserTodoItem(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const { user, query } = req;
      let todoId = get(query, "todoId", null);
      let listId = get(query, "listId", null);
      if (!listId) {
        throw new Error(TodoMessage.LIST_ID_IS_REQUIRED);
      }

      const allTodoItems = await this.todoService.getUserTodoItem(
        user.uuid,
        listId,
        todoId
      );

      return res.status(StatusCode.SUCCESS).json({
        data: {
          allTodo: allTodoItems,
        },
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: CommonMessages.UNABLE_TO_FETCH_RESULT,
      });
    }
  }

  public async updateUserTodoItem(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    try {
      await validateUpdateTodoItemRequest.validate(get(req, "body"));
    } catch (e) {
      return res.status(StatusCode.BAD_REQUEST).json({
        title: e.message,
        description: CommonMessages.INVALID_REQ_BODY,
      });
    }
    try {
      const userId = get(req, "user.uuid");
      const listId = get(req, "body.listId");
      const todoId = get(req, "body.todoId");
      const updates = get(req, "body.updates");

      await this.todoService.updateUserTodoItem(
        userId,
        listId,
        todoId,
        updates
      );

      res.status(StatusCode.SUCCESS).json({
        success: true,
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: CommonMessages.UNABLE_TO_UPDATE_RECORD,
      });
    }
  }

  public async deleteUserTodoItem(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    try {
      await validateDeleteTodoItemRequest.validate(get(req, "body"));
    } catch (e) {
      return res.status(StatusCode.BAD_REQUEST).json({
        title: e.message,
        description: CommonMessages.INVALID_REQ_BODY,
      });
    }

    try {
      const userId = get(req, "user.uuid");
      const listId = get(req, "body.listId");
      const todoId = get(req, "body.todoId");

      await this.todoService.updateUserTodoItem(userId, listId, todoId, {
        isDeleted: true,
      });
      res.status(StatusCode.SUCCESS).json({
        success: true,
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: CommonMessages.UNABLE_TO_UPDATE_RECORD,
      });
    }
  }
}
