import {
  Attributes,
  FindAttributeOptions,
  Model,
  WhereOptions,
} from "sequelize";

export interface UserAttributesType {
  _id: string;
  name: string;
  emailId: string;
  password: string;
  token?: string;
}
export type IUserModel = UserAttributesType & Model<any, any>;

export type IPublicUser = Omit<UserAttributesType, "password">;

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
