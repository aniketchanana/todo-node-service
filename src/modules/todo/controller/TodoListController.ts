import { Response } from "express";
import { AuthenticatedRequest } from "../../../common/types";
import { inject, injectable } from "inversify";
import { Types } from "../../../DiTypes";
import { ITodoListService } from "../service/TodoListService";

export interface ITodoListController {
  createNewList: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
}

@injectable()
export class TodoListController implements ITodoListController {
  @inject(Types.TODO_LIST_SERVICE) private todoListService: ITodoListService;

  createNewList: (
    req: AuthenticatedRequest,
    res: Response<any, Record<string, any>>
  ) => Promise<Response<any, Record<string, any>>>;
}
