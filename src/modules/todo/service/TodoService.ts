import { inject, injectable } from "inversify";
import { ITodoItem, ITodoList } from "../../../data/interfaces";
import { Types } from "../../../DiTypes";
import { ITodoRepository } from "../repository/TodoRepository";
import { TodoMessage } from "../../../constants/messages";

export interface ITodoService {
  createNewList: (listName: string, userUUID: string) => Promise<ITodoList>;
  getUserTodoList: (
    userId: string,
    listId: string | null,
    pageNumber: number | null,
    pageSize: number | null
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
    todoId: string | null,
    pageNumber: number | null,
    pageSize: number | null
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
    listId: string | null,
    pageNumber: number,
    pageSize: number
  ): Promise<ITodoList[]> {
    return this.todoRepository.getUserTodoList(
      userId,
      listId,
      pageNumber,
      pageSize
    );
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
    const userList = await this.todoRepository.getUserTodoList(
      userId,
      listId,
      1,
      1
    );
    if (userList.length > 0) {
      return await this.todoRepository.getUserTodoItem(
        userId,
        listId,
        todoId,
        null,
        null
      );
    }

    throw new Error(TodoMessage.REQUESTED_LIST_IS_NOT_AVAILABLE);
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
