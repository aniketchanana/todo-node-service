import { Attributes, Model, WhereOptions } from "sequelize";

export interface Projection {
  [key: string]: boolean | 1 | 0;
}
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
    project?: Projection
  ): Promise<T>;
  findMany(
    filter: WhereOptions<Attributes<T>>,
    project?: Projection
  ): Promise<T[]>;
  findOneAndUpdate(
    filter: WhereOptions<Attributes<T>>,
    updates: Partial<T>
  ): Promise<T>;
  findOneAndDelete(filter: WhereOptions<Attributes<T>>): Promise<number>;
}
