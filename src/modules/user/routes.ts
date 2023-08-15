import express from "express";
import { userEndpoints } from "../../constants/routes";
import { Types } from "../../DiTypes";
import { dIContainer } from "../../inversify.config";
import { IUserController } from "./controller/UserController";

// this place we define out routes which takes in use case as our parameter
export default function UserRouter(authMiddleWare) {
  const router = express.Router();

  const userControllerInstance = dIContainer.get<IUserController>(
    Types.USER_CONTROLLER
  );
  router.post(
    userEndpoints.signIn,
    userControllerInstance.signIn.bind(userControllerInstance)
  );
  router.post(
    userEndpoints.signUp,
    userControllerInstance.signUp.bind(userControllerInstance)
  );
  router.put(
    userEndpoints.logout,
    authMiddleWare,
    userControllerInstance.logOut.bind(userControllerInstance)
  );
  router.get(
    userEndpoints.isValidSession,
    authMiddleWare,
    userControllerInstance.isValidSession.bind(userControllerInstance)
  );
  return router;
}
