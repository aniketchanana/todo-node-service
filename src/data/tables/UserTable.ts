import { injectable } from "inversify";
import { DB_TABLES } from "../../constants/dbTables";
import { IUserModel } from "../interfaces";
import { DataSource } from "../source";

@injectable()
export class UserTable extends DataSource<IUserModel> {
  constructor() {
    super(DB_TABLES.USER);
  }
}
