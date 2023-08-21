"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../../constants/routes");
const DiTypes_1 = require("../../DiTypes");
const inversify_config_1 = require("../../inversify.config");
// this place we define out routes which takes in use case as our parameter
function UserRouter(authMiddleWare) {
    const router = express_1.default.Router();
    const userControllerInstance = inversify_config_1.dIContainer.get(DiTypes_1.Types.USER_CONTROLLER);
    router.post(routes_1.userEndpoints.signIn, userControllerInstance.signIn.bind(userControllerInstance));
    router.post(routes_1.userEndpoints.signUp, userControllerInstance.signUp.bind(userControllerInstance));
    router.put(routes_1.userEndpoints.logout, authMiddleWare, userControllerInstance.logOut.bind(userControllerInstance));
    router.get(routes_1.userEndpoints.isValidSession, authMiddleWare, userControllerInstance.isValidSession.bind(userControllerInstance));
    return router;
}
exports.default = UserRouter;
//# sourceMappingURL=routes.js.map