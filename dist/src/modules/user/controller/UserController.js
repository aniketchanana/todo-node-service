"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const statusCode_1 = require("../../../constants/statusCode");
const reqValidations_1 = require("./reqValidations");
const messages_1 = require("../../../constants/messages");
const inversify_1 = require("inversify");
const DiTypes_1 = require("../../../DiTypes");
const CookieSetterOptions = {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days,
};
if (process.env.NODE_ENV === "production") {
    CookieSetterOptions["sameSite"] = "none";
    CookieSetterOptions["secure"] = true;
}
let UserController = class UserController {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reqValidations_1.validateSignInRequest.validate(req.body);
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.BAD_REQUEST).json({
                    title: e.message,
                    description: messages_1.CommonMessages.INVALID_REQ_BODY,
                });
            }
            try {
                const { emailId, password } = req.body;
                const loggedInUser = yield this.userService.signInUser(emailId, password);
                if (!loggedInUser) {
                    throw new Error(messages_1.AuthMessages.UNABLE_TO_SIGN_IN);
                }
                return res
                    .cookie("token", loggedInUser.token, CookieSetterOptions)
                    .status(statusCode_1.StatusCode.SUCCESS)
                    .json({ user: loggedInUser });
            }
            catch (e) {
                if (e.message === messages_1.AuthMessages.UNABLE_TO_SIGN_IN) {
                    return res.status(statusCode_1.StatusCode.UN_AUTHORIZED).send({
                        title: e.message,
                        description: messages_1.AuthMessages.INVALID_CREDENTIALS,
                    });
                }
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.AuthMessages.INVALID_CREDENTIALS,
                });
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = req.body.userDetails;
            try {
                yield reqValidations_1.validateSignUpRequest.validate(req.body);
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.BAD_REQUEST).json({
                    title: e.message,
                    description: messages_1.CommonMessages.INVALID_REQ_BODY,
                });
            }
            try {
                const newUser = yield this.userService.createUserAndGenerateAuthToken(userDetails.name, userDetails.emailId, userDetails.password);
                return res
                    .cookie("token", newUser.token, CookieSetterOptions)
                    .status(statusCode_1.StatusCode.RESOURCE_CREATED)
                    .json({ user: newUser });
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.CommonMessages.SOMETHING_WENT_WRONG,
                });
            }
        });
    }
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    throw new Error();
                }
                yield this.userService.clearUserAuthToken(req.user.uuid);
                return res.clearCookie("token").status(statusCode_1.StatusCode.SUCCESS).json({});
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.UN_AUTHORIZED).json({
                    title: messages_1.AuthMessages.INVALID_USER,
                });
            }
        });
    }
    isValidSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return res.status(statusCode_1.StatusCode.UN_AUTHORIZED).json({
                    title: messages_1.AuthMessages.INVALID_USER,
                });
            }
            return res.status(statusCode_1.StatusCode.SUCCESS).json({ user: req.user });
        });
    }
};
__decorate([
    (0, inversify_1.inject)(DiTypes_1.Types.USER_SERVICE),
    __metadata("design:type", Object)
], UserController.prototype, "userService", void 0);
UserController = __decorate([
    (0, inversify_1.injectable)()
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map