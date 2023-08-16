import { inject, injectable } from "inversify";
import { ITodoList } from "../../../data/interfaces";
import { Types } from "../../../DiTypes";
import { ITodoRepository } from "../repository/TodoRepository";

export interface ITodoService {
  createNewList: (listName: string, userUUID: string) => Promise<ITodoList>;
  getUserTodoList: (
    userId: string,
    listId: string | null
  ) => Promise<ITodoList[]>;
  updateUserTodoList: (
    userId: string,
    listId: string,
    updates: Partial<ITodoList>
  ) => Promise<ITodoList>;
}

@injectable()
export class TodoService implements ITodoService {
  @inject(Types.TODO_REPOSITORY)
  private todoRepository: ITodoRepository;

  public async createNewList(
    listName: string,
    userUUID: string
  ): Promise<ITodoList> {
    return this.todoRepository.createNewList(listName, userUUID);
  }

  public async getUserTodoList(
    userId: string,
    listId: string | null
  ): Promise<ITodoList[]> {
    return this.todoRepository.getUserTodoList(userId, listId);
  }

  public async updateUserTodoList(
    userId: string,
    listId: string,
    updates: Partial<ITodoList>
  ): Promise<ITodoList> {
    return this.todoRepository.updateTodoList(userId, listId, updates);
  }
}
