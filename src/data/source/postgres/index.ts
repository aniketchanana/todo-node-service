import { injectable, unmanaged } from "inversify";
import { AppDataSource } from "../../interfaces";
import { DB_TABLES } from "../../../constants/dbTables";
import { User } from "./models/userModel";
import { TodoList } from "./models/todoListModel";
import { GenericObject } from "../../../common/types";
import {
  Model,
  ModelCtor,
  ModelStatic,
  BuildOptions,
  Attributes,
  WhereOptions,
  FindAttributeOptions,
} from "sequelize";
import { isEmpty, set } from "lodash";

const ALL_TABLES: GenericObject<ModelStatic<any>> = {
  [DB_TABLES.USER]: User,
  [DB_TABLES.TODO_LIST]: TodoList,
};

@injectable()
export class PostgresDataSource<T extends Model> implements AppDataSource<T> {
  private table: ModelStatic<T>;
  constructor(@unmanaged() tableName: DB_TABLES) {
    this.table = ALL_TABLES[tableName];
  }

  public async create(
    data: Partial<T["dataValues"]>,
    options?: BuildOptions
  ): Promise<T["dataValues"]> {
    const instance = this.table.build(data as any, options);
    await instance.save();
    return instance;
  }

  public async findOne(
    filter: WhereOptions<Attributes<T>>,
    project?: FindAttributeOptions
  ): Promise<T["dataValues"]> {
    const query = {
      where: filter,
    };
    if (!isEmpty(project)) {
      set(query, "attributes", project);
    }
    const record = await this.table.findOne(query);

    return record.dataValues;
  }

  public async findMany(
    filter: WhereOptions<Attributes<T["dataValues"]>>,
    project?: FindAttributeOptions
  ): Promise<T["dataValues"][]> {
    const query = {
      where: filter,
    };
    if (!isEmpty(project)) {
      set(query, "attributes", project);
    }
    const records = await this.table.findAll(query);

    return records;
  }

  public async findOneAndUpdate(
    filter: WhereOptions<Attributes<T["dataValues"]>>,
    updates: Partial<T["dataValues"]>
  ): Promise<T["dataValues"]> {
    const record = await this.table.findOne({
      where: filter,
    });
    if (record) {
      const updatedRecord = await record.update(updates, {
        where: filter,
      });
      return updatedRecord.dataValues;
    }
    throw new Error("Record not found");
  }

  public async findOneAndDelete(
    filter: WhereOptions<Attributes<T["dataValues"]>>
  ): Promise<boolean> {
    const updates = {
      isDeleted: true,
    } as unknown as Partial<T>;
    const updatedRecord = this.findOneAndUpdate(filter, updates);
    if (updatedRecord) {
      return true;
    }
    return false;
  }
}
