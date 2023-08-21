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
exports.UserRepository = void 0;
const inversify_1 = require("inversify");
const messages_1 = require("../../../constants/messages");
const DiTypes_1 = require("../../../DiTypes");
let UserRepository = class UserRepository {
    getPublicUserProfile(user) {
        return {
            uuid: user.uuid,
            name: user.name,
            emailId: user.emailId,
            token: user.token,
        };
    }
    createNewUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUserDetails = yield this.userTable.create(userDetails);
                const publicUserDetails = this.getPublicUserProfile(newUserDetails);
                return publicUserDetails;
            }
            catch (e) {
                throw new Error(messages_1.AuthMessages.UNABLE_TO_CREATE_NEW_USER);
            }
        });
    }
    getUserByEmail(emailId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userTable.findOne({ emailId });
                if (!user) {
                    throw new Error();
                }
                return user;
            }
            catch (_a) {
                throw new Error(messages_1.AuthMessages.INVALID_USER);
            }
        });
    }
    updateExistingUserDetails(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUserDetails = yield this.userTable.findOneAndUpdate({
                    uuid: userId,
                }, updates);
                return this.getPublicUserProfile(updatedUserDetails);
            }
            catch (e) {
                throw new Error(messages_1.AuthMessages.UNABLE_TO_SIGN_IN);
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(DiTypes_1.Types.USER_TABLE),
    __metadata("design:type", Object)
], UserRepository.prototype, "userTable", void 0);
UserRepository = __decorate([
    (0, inversify_1.injectable)()
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map