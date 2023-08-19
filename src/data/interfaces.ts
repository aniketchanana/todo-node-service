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

interface TodoItemAttributes {
  uuid: string;
  text: string;
  todoListId: string;
  isDeleted: boolean;
  isChecked: boolean;
  userId: string;
}
export type IUserModel = Model<UserAttributesType, any>;
export type IUser = IUserModel["dataValues"];
export type IPublicUser = Omit<IUser, "password">;

export type ITodoListModel = Model<TodoListAttributes, any>;
export type ITodoList = ITodoListModel["dataValues"];

export type ITodoItemModel = Model<TodoItemAttributes, any>;
export type ITodoItem = ITodoItemModel["dataValues"];

export interface IPagination {
  pageNumber: number;
  pageSize: number;
}

export interface IFindManyQuery<T extends Model> {
  filter: WhereOptions<Attributes<T["dataValues"]>>;
  project?: FindAttributeOptions;
  pagination?: IPagination;
  orderByQuery?: string[][];
}
export interface AppDataSource<T extends Model> {
  create(
    data: Partial<T["dataValues"]>,
    options?: BuildOptions
  ): Promise<T["dataValues"]>;
  findOne(
    filter: WhereOptions<Attributes<T>>,
    project?: FindAttributeOptions
  ): Promise<T["dataValues"]>;
  findMany(options: IFindManyQuery<T>): Promise<T["dataValues"][]>;
  findOneAndUpdate(
    filter: WhereOptions<Attributes<T>>,
    updates: Partial<T["dataValues"]>
  ): Promise<T["dataValues"]>;
  findOneAndDelete(
    filter: WhereOptions<Attributes<T["dataValues"]>>
  ): Promise<boolean>;
}
