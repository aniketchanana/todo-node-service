import { Container } from "inversify";
import { Types } from "./DiTypes";
import { IUserService, UserService } from "./modules/user/service/UserService";
import {
  IUserRepository,
  UserRepository,
} from "./modules/user/repository/UserRepository";
import {
  UserController,
  IUserController,
} from "./modules/user/controller/UserController";
import { AppDataSource, ITodoListModel, IUserModel } from "./data/interfaces";
import { UserTable } from "./data/tables/UserTable";
import { ITodoService, TodoService } from "./modules/todo/service/TodoService";
import {
  ITodoRepository,
  TodoRepository,
} from "./modules/todo/repository/TodoRepository";
import {
  ITodoController,
  TodoController,
} from "./modules/todo/controller/TodoController";
import { TodoListTable } from "./data/tables/TodoListTable";

const dIContainer = new Container();

// DB tables
dIContainer.bind<AppDataSource<IUserModel>>(Types.USER_TABLE).to(UserTable);
dIContainer
  .bind<AppDataSource<ITodoListModel>>(Types.TODO_LIST_TABLE)
  .to(TodoListTable);

// For auth service module
dIContainer.bind<IUserService>(Types.USER_SERVICE).to(UserService);
dIContainer.bind<IUserRepository>(Types.USER_REPOSITORY).to(UserRepository);
dIContainer.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);

dIContainer.bind<ITodoService>(Types.TODO_SERVICE).to(TodoService);
dIContainer.bind<ITodoRepository>(Types.TODO_REPOSITORY).to(TodoRepository);
dIContainer.bind<ITodoController>(Types.TODO_CONTROLLER).to(TodoController);

export { dIContainer };
