"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthMiddleWare = void 0;
const messages_1 = require("../constants/messages");
const statusCode_1 = require("../constants/statusCode");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inversify_config_1 = require("../inversify.config");
const DiTypes_1 = require("../DiTypes");
const utils_1 = require("../utils");
const lodash_1 = require("lodash");
const getAuthMiddleWare = () => {
    const userTable = inversify_config_1.dIContainer.get(DiTypes_1.Types.USER_TABLE);
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = (0, utils_1.parseCookieString)((0, lodash_1.get)(req, "headers.cookie", "")).token ||
                req.headers.token;
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT);
            const user = yield userTable.findOne({
                emailId: decoded.emailId,
                token: token,
            });
            if (!user) {
                throw new Error();
            }
            req.token = token;
            req.user = user;
        }
        catch (e) {
            return res
                .status(statusCode_1.StatusCode.UN_AUTHORIZED)
                .send({ title: messages_1.AuthMessages.INVALID_USER });
        }
        next();
    });
};
exports.getAuthMiddleWare = getAuthMiddleWare;
//# sourceMappingURL=auth.js.map