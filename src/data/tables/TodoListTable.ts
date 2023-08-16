import { injectable } from "inversify";
import { DB_TABLES } from "../../constants/dbTables";
import { ITodoListModel } from "../interfaces";
import { DataSource } from "../source";

@injectable()
export class TodoListTable extends DataSource<ITodoListModel> {
  constructor() {
    super(DB_TABLES.TODO_LIST);
  }
}
