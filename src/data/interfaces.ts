import {
  Attributes,
  FindAttributeOptions,
  Model,
  WhereOptions,
} from "sequelize";

export interface IUserModel extends Model<any, any> {
  id: string;
  name: string;
  emailId: string;
  password: string;
  token?: string;
}
export type IPublicUser = Omit<IUserModel, "password">;
export interface AppDataSource<T extends Model> {
  create(data: T): Promise<T>;
  findOne(
    filter: WhereOptions<Attributes<T>>,
    project?: FindAttributeOptions
  ): Promise<T>;
  findMany(
    filter: WhereOptions<Attributes<T>>,
    project?: FindAttributeOptions
  ): Promise<T[]>;
  findOneAndUpdate(
    filter: WhereOptions<Attributes<T>>,
    updates: Partial<T>
  ): Promise<T>;
  findOneAndDelete(filter: WhereOptions<Attributes<T>>): Promise<number>;
}
