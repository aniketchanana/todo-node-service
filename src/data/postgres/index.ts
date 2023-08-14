import { injectable } from "inversify";
import { AppDataSource } from "../interfaces";

const ALL_TABLES = {};
@injectable()
export class PostgresDataSource<T> implements AppDataSource<T> {}
