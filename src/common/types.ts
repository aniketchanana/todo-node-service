import { Request } from "express";
import { IUser } from "../data/interfaces";

export interface GenericObject<K = any> {
  [key: string]: K;
}

export interface AuthenticatedRequest extends Request {
  user: IUser | null | undefined;
}
