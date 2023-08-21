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
exports.compareHash = exports.createHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const messages_1 = require("../constants/messages");
const createHash = (plainText) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.hash(plainText, 12);
    }
    catch (_a) {
        throw new Error(messages_1.CommonMessages.SOMETHING_WENT_WRONG);
    }
});
exports.createHash = createHash;
const compareHash = (plainText, hashedText) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(plainText, hashedText);
    }
    catch (_b) {
        throw new Error(messages_1.CommonMessages.SOMETHING_WENT_WRONG);
    }
});
exports.compareHash = compareHash;
//# sourceMappingURL=hashing.js.map