import { inject, injectable } from "inversify";
import { ITodoItem, ITodoList } from "../../../data/interfaces";
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

  createNewTodoItem: (
    text: string,
    listId: string,
    userId: string
  ) => Promise<ITodoItem>;

  getUserTodoItem: (
    userId: string,
    listId: string,
    todoId: string | null
  ) => Promise<ITodoItem[]>;
  updateUserTodoItem: (
    userId: string,
    listId: string,
    todoId: string,
    update: Partial<ITodoItem>
  ) => Promise<ITodoItem>;
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

  public async createNewTodoItem(
    text: string,
    listId: string,
    userId: string
  ): Promise<ITodoItem> {
    return this.todoRepository.createNewTodoItem(text, listId, userId);
  }

  public async getUserTodoItem(
    userId: string,
    listId: string,
    todoId: string
  ): Promise<ITodoItem[]> {
    return this.todoRepository.getUserTodoItem(userId, listId, todoId);
  }

  public async updateUserTodoItem(
    userId: string,
    listId: string,
    todoId: string,
    updates: Partial<ITodoItem>
  ): Promise<ITodoItem> {
    return this.todoRepository.updateUserTodoItem(
      userId,
      listId,
      todoId,
      updates
    );
  }
}
