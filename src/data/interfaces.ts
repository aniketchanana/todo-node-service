import {
  Attributes,
  BuildOptions,
  FindAttributeOptions,
  Model,
  WhereOptions,
} from "sequelize";
import { GenericObject } from "../common/types";

interface UserAttributesType {
  uuid: string;
  name: string;
  emailId: string;
  password: string;
  token?: string;
}
interface TodoListAttributes {
  uuid: string;
  name: string;
  isDeleted: boolean;
  userId: string;
}
export type IUserModel = Model<UserAttributesType, any>;
export type IUser = IUserModel["dataValues"];
export type IPublicUser = Omit<IUser, "password">;

export type ITodoListModel = Model<TodoListAttributes, any>;
export type ITodoList = ITodoListModel["dataValues"];

export interface AppDataSource<T extends Model> {
  create(
    data: Partial<T["dataValues"]>,
    options?: BuildOptions
  ): Promise<T["dataValues"]>;
  findOne(
    filter: WhereOptions<Attributes<T>>,
    project?: FindAttributeOptions
  ): Promise<T["dataValues"]>;
  findMany(
    filter: WhereOptions<Attributes<T["dataValues"]>>,
    project?: FindAttributeOptions
  ): Promise<T["dataValues"][]>;
  findOneAndUpdate(
    filter: WhereOptions<Attributes<T>>,
    updates: Partial<T["dataValues"]>
  ): Promise<T["dataValues"]>;
  findOneAndDelete(
    filter: WhereOptions<Attributes<T["dataValues"]>>
  ): Promise<boolean>;
}
