import { injectable } from "inversify";
import { TodoListAttributes } from "../../../data/interfaces";

export interface ITodoListRepository {
  createNewList: (listName: string) => Promise<TodoListAttributes>;
}

@injectable()
export class TodoListRepository implements ITodoListRepository {
  public createNewList(listName: string): Promise<TodoListAttributes> {
    return {} as Promise<TodoListAttributes>;
  }
}
