import { AuthMessages } from "../constants/messages";
import { StatusCode } from "../constants/statusCode";
import { AppDataSource, IUserModel } from "../data/interfaces";
import jwt from "jsonwebtoken";
import { dIContainer } from "../inversify.config";
import { Types } from "../DiTypes";
import { parseCookieString } from "../utils";
import { get } from "lodash";

export const getAuthMiddleWare = () => {
  const userTable: AppDataSource<IUserModel> = dIContainer.get<
    AppDataSource<IUserModel>
  >(Types.USER_TABLE);

  return async (req, res, next) => {
    try {
      const token =
        parseCookieString(get(req, "headers.cookie", "")).token ||
        req.headers.token;
      const decoded = jwt.verify(token, process.env.JWT) as { emailId: string };
      const user = await userTable.findOne({
        emailId: decoded.emailId,
        token: token,
      });
      if (!user) {
        throw new Error();
      }
      req.token = token;
      req.user = user;
    } catch (e) {
      return res
        .status(StatusCode.UN_AUTHORIZED)
        .send({ title: AuthMessages.INVALID_USER });
    }
    next();
  };
};
