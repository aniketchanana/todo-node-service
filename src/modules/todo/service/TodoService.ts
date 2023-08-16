import { inject, injectable } from "inversify";
import { TodoListAttributes } from "../../../data/interfaces";
import { Types } from "../../../DiTypes";
import { ITodoRepository } from "../repository/TodoRepository";

export interface ITodoService {
  createNewList: (
    listName: string,
    userUUID: string
  ) => Promise<TodoListAttributes>;
}

@injectable()
export class TodoService implements ITodoService {
  @inject(Types.TODO_REPOSITORY)
  private todoRepository: ITodoRepository;

  public async createNewList(listName: string, userUUID: string) {
    return this.todoRepository.createNewList(listName, userUUID);
  }
}
