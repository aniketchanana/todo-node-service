import { inject, injectable } from "inversify";
import {
  AppDataSource,
  ITodoListModel,
  ITodoList,
  IUser,
} from "../../../data/interfaces";
import { Types } from "../../../DiTypes";
import { sequelize } from "../../../data/source/postgres/init";

export interface ITodoRepository {
  createNewList: (listName: string, userUUID: string) => Promise<ITodoList>;
  getUserTodoList: (
    userId: string,
    listId: string | null
  ) => Promise<ITodoList[]>;
  updateTodoList: (
    userId: string,
    listId: string,
    updates: Partial<ITodoList>
  ) => Promise<ITodoList>;
}

// ToDo: fix any typeCasting here

@injectable()
export class TodoRepository implements ITodoRepository {
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
    listId: string | null
  ): Promise<ITodoList[]> {
    const query: Partial<ITodoList> = {
      userId,
    };
    if (listId) {
      query.uuid = listId;
    }
    return this.todoListTable.findMany(query);
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
}
