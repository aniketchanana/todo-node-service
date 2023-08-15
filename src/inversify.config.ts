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
import { AppDataSource, IUserModel } from "./data/interfaces";
import { UserTable } from "./data/tables/UserTable";
import {
  ITodoListService,
  TodoListService,
} from "./modules/todo/service/TodoListService";
import {
  ITodoListRepository,
  TodoListRepository,
} from "./modules/todo/repository/TodoListRepository";
import {
  ITodoListController,
  TodoListController,
} from "./modules/todo/controller/TodoListController";

const dIContainer = new Container();

// DB tables
dIContainer.bind<AppDataSource<IUserModel>>(Types.USER_TABLE).to(UserTable);

// For auth service module
dIContainer.bind<IUserService>(Types.USER_SERVICE).to(UserService);
dIContainer.bind<IUserRepository>(Types.USER_REPOSITORY).to(UserRepository);
dIContainer.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);

dIContainer.bind<ITodoListService>(Types.TODO_LIST_SERVICE).to(TodoListService);
dIContainer
  .bind<ITodoListRepository>(Types.TODO_LIST_REPOSITORY)
  .to(TodoListRepository);
dIContainer
  .bind<ITodoListController>(Types.TODO_LIST_CONTROLLER)
  .to(TodoListController);

export { dIContainer };
