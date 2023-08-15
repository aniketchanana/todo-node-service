import { inject, injectable } from "inversify";
import { TodoListAttributes } from "../../../data/interfaces";
import { Types } from "../../../DiTypes";
import { ITodoListRepository } from "../repository/TodoListRepository";

export interface ITodoListService {
  createNewList: (listName: string) => Promise<TodoListAttributes>;
}

@injectable()
export class TodoListService implements ITodoListService {
  @inject(Types.TODO_LIST_REPOSITORY)
  private todoListRepository: ITodoListRepository;

  public createNewList: (listName: string) => Promise<TodoListAttributes>;
}
