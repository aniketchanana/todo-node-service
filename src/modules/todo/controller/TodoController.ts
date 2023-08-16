import { Response } from "express";
import { AuthenticatedRequest } from "../../../common/types";
import { inject, injectable } from "inversify";
import { Types } from "../../../DiTypes";
import { ITodoService } from "../service/TodoService";
import {
  validateCreateNewListRequest,
  validateTodoListUpdateRequest,
} from "./reqValidations";
import { StatusCode } from "../../../constants/statusCode";
import { CommonMessages, TodoMessage } from "../../../constants/messages";
import { get } from "lodash";

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
      await validateCreateNewListRequest.validate(newListParameters);
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
      await validateTodoListUpdateRequest.validate(get(req, "body"));
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
        updated: true,
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
        description: CommonMessages.UNABLE_TO_UPDATE_RECORDS,
      });
    }
  }
}
