import { injectable } from "inversify";
import { DB_TABLES } from "../../constants/dbTables";
import { ITodoItemModel } from "../interfaces";
import { DataSource } from "../source";

@injectable()
export class TodoItemTable extends DataSource<ITodoItemModel> {
  constructor() {
    super(DB_TABLES.TODO_ITEM);
  }
}
