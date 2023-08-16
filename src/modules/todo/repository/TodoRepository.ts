import { inject, injectable } from "inversify";
import {
  AppDataSource,
  ITodoListModel,
  TodoListAttributes,
  IUser,
} from "../../../data/interfaces";
import { Types } from "../../../DiTypes";
import { sequelize } from "../../../data/source/postgres/init";

export interface ITodoRepository {
  createNewList: (
    listName: string,
    userUUID: string
  ) => Promise<TodoListAttributes>;
}

@injectable()
export class TodoRepository implements ITodoRepository {
  @inject(Types.TODO_LIST_TABLE)
  private todoListTable: AppDataSource<ITodoListModel>;

  public createNewList(
    listName: string,
    userUUID: string
  ): Promise<TodoListAttributes> {
    return this.todoListTable.create({
      name: listName,
      userId: sequelize.fn("uuid", userUUID),
    } as any);
  }
}
