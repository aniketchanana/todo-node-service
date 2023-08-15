import {
  Attributes,
  FindAttributeOptions,
  Model,
  WhereOptions,
} from "sequelize";

export interface UserAttributesType {
  uuid: string;
  name: string;
  emailId: string;
  password: string;
  token?: string;
}

export interface TodoListAttributes {
  uuid: string;
  name: string;
  isDeleted: boolean;
}
export type IUserModel = UserAttributesType & Model<any, any>;
export type ITodoListModel = TodoListAttributes & Model<any, any>;

export type PublicUserAttributes = Omit<UserAttributesType, "password">;

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
  findOneAndDelete(filter: WhereOptions<Attributes<T>>): Promise<boolean>;
}
