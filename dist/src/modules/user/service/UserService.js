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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("../../../constants/messages");
const inversify_1 = require("inversify");
const DiTypes_1 = require("../../../DiTypes");
const hashing_1 = require("../../../utils/hashing");
let UserService = class UserService {
    generateFreshAuthToken(emailId) {
        return jsonwebtoken_1.default.sign({ emailId: emailId.toString() }, process.env.JWT, {
            expiresIn: Math.floor(Date.now()) + 1000 * 60 * 60 * 24 * 30, // 30 days
        });
    }
    createUserAndGenerateAuthToken(name, emailId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.generateFreshAuthToken(emailId);
            const hashedPassword = yield (0, hashing_1.createHash)(password);
            const newUser = yield this.userRepository.createNewUser({
                name,
                emailId,
                password: hashedPassword,
                token,
            });
            return newUser;
        });
    }
    signInUser(emailId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempUser = yield this.userRepository.getUserByEmail(emailId);
            if (!tempUser) {
                throw new Error(messages_1.AuthMessages.UNABLE_TO_SIGN_IN);
            }
            const isMatch = yield (0, hashing_1.compareHash)(password, tempUser.password);
            if (!isMatch) {
                throw new Error(messages_1.AuthMessages.UNABLE_TO_SIGN_IN);
            }
            const newToken = this.generateFreshAuthToken(emailId);
            return yield this.userRepository.updateExistingUserDetails(tempUser.uuid, {
                token: newToken,
            });
        });
    }
    clearUserAuthToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.updateExistingUserDetails(userId, {
                token: "",
            });
        });
    }
};
__decorate([
    (0, inversify_1.inject)(DiTypes_1.Types.USER_REPOSITORY),
    __metadata("design:type", Object)
], UserService.prototype, "userRepository", void 0);
UserService = __decorate([
    (0, inversify_1.injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map