import { injectable, unmanaged } from "inversify";
import { AppDataSource, IUserModel, Projection } from "../interfaces";
import { DB_TABLES } from "../../constants/dbTables";
import { User } from "./models/userModel";
import { GenericObject } from "../../common/types";
import {
  Model,
  ModelCtor,
  ModelStatic,
  BuildOptions,
  Attributes,
  WhereOptions,
} from "sequelize";

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

  public async findOne(
    filter: WhereOptions<Attributes<T>>,
    project?: Projection
  ): Promise<T> {
    const record = await this.table.findOne({
      where: filter,
    });

    return record;
  }

  public async findMany(
    filter: WhereOptions<Attributes<T>>,
    project?: Projection
  ): Promise<T[]> {
    const records = await this.table.findAll({
      where: filter,
    });

    return records;
  }

  public async findOneAndUpdate(
    filter: WhereOptions<Attributes<T>>,
    updates: Partial<T>
  ): Promise<T> {
    const record = await this.table.findOne({
      where: filter,
    });
    if (record) {
      const updatedRecord = await record.update(updates, {
        where: filter,
      });
      return updatedRecord;
    }
    throw new Error("Record not found");
  }

  public async findOneAndDelete(
    filter: WhereOptions<Attributes<T>>
  ): Promise<number> {
    return this.table.destroy({
      where: filter,
    });
  }
}
