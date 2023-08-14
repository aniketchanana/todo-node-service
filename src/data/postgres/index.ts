import { injectable, unmanaged } from "inversify";
import { AppDataSource, IUserModel } from "../interfaces";
import { DB_TABLES } from "../../constants/dbTables";
import { User } from "./models/userModel";
import { GenericObject } from "../../common/types";
import { Model, ModelCtor, ModelStatic, BuildOptions } from "sequelize";

const ALL_TABLES: GenericObject<ModelStatic<any>> = {
  [DB_TABLES.USER]: User,
};
@injectable()
export class PostgresDataSource<T extends Model> implements AppDataSource<T> {
  private table: ModelStatic<T>;
  constructor(@unmanaged() tableName: DB_TABLES) {
    this.table = ALL_TABLES[tableName];
  }

  public async create(data: T, options?: BuildOptions): Promise<T> {
    const instance = this.table.build(data as any, options);
    await instance.save();
    return instance;
  }
}
