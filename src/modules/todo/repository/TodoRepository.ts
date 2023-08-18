import { inject, injectable } from "inversify";
import {
  AppDataSource,
  ITodoListModel,
  ITodoList,
  IUser,
  ITodoItem,
  ITodoItemModel,
  IPagination,
} from "../../../data/interfaces";
import { Types } from "../../../DiTypes";
import { sequelize } from "../../../data/source/postgres/init";

export interface ITodoRepository {
  createNewList: (listName: string, userUUID: string) => Promise<ITodoList>;
  getUserTodoList: (
    userId: string,
    listId: string | null,
    pageNumber: number | null,
    pageSize: number | null
  ) => Promise<ITodoList[]>;
  updateTodoList: (
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
    updates: Partial<ITodoItem>
  ) => Promise<ITodoItem>;
}

// ToDo: fix any typeCasting here

@injectable()
export class TodoRepository implements ITodoRepository {
  @inject(Types.TODO_ITEM_TABLE)
  private todoItemTable: AppDataSource<ITodoItemModel>;
  @inject(Types.TODO_LIST_TABLE)
  private todoListTable: AppDataSource<ITodoListModel>;

  public async createNewList(
    listName: string,
    userUUID: string
  ): Promise<ITodoList> {
    return this.todoListTable.create({
      name: listName,
      userId: userUUID,
    });
  }

  public async getUserTodoList(
    userId: string,
    listId: string | null,
    pageNumber: number | null,
    pageSize: number | null
  ): Promise<ITodoList[]> {
    const query: Partial<ITodoList> = {
      userId,
      isDeleted: false,
    };
    if (listId) {
      query.uuid = listId;
    }
    let pagination = {} as IPagination;
    if (pageNumber && pageSize) {
      pagination = {
        pageNumber,
        pageSize,
      };
    }
    return this.todoListTable.findMany(query, undefined, pagination);
  }

  public async updateTodoList(
    userId: string,
    listId: string,
    updates: Partial<ITodoList>
  ): Promise<ITodoList> {
    return this.todoListTable.findOneAndUpdate(
      {
        userId,
        uuid: listId,
      },
      { ...updates }
    );
  }

  public async createNewTodoItem(
    text: string,
    listId: string,
    userId: string
  ): Promise<ITodoItem> {
    return this.todoItemTable.create({
      text,
      userId,
      todoListId: listId,
    });
  }

  public async getUserTodoItem(
    userId: string,
    listId: string,
    todoId: string | null,
    pageNumber: number | null,
    pageSize: number | null
  ): Promise<ITodoItem[]> {
    const query: Partial<ITodoItem> = {
      userId,
      isDeleted: false,
      todoListId: listId,
    };
    if (todoId) {
      query.uuid = todoId;
    }
    return this.todoItemTable.findMany(query);
  }

  public async updateUserTodoItem(
    userId: string,
    listId: string,
    todoId: string,
    updates: Partial<ITodoItem>
  ): Promise<ITodoItem> {
    return this.todoItemTable.findOneAndUpdate(
      {
        userId,
        uuid: todoId,
        todoListId: listId,
      },
      { ...updates }
    );
  }
}
