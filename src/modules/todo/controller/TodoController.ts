import { Response } from "express";
import { AuthenticatedRequest } from "../../../common/types";
import { inject, injectable } from "inversify";
import { Types } from "../../../DiTypes";
import { ITodoService } from "../service/TodoService";
import { validateCreateNewListRequest } from "./reqValidations";
import { StatusCode } from "../../../constants/statusCode";
import { CommonMessages, TodoMessage } from "../../../constants/messages";

export interface ITodoController {
  createNewList: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
}

@injectable()
export class TodoController implements ITodoController {
  @inject(Types.TODO_SERVICE) private todoListService: ITodoService;

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
      const newList = await this.todoListService.createNewList(
        listName,
        user.uuid
      );

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
}
