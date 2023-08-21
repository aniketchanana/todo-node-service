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
exports.TodoService = void 0;
const inversify_1 = require("inversify");
const DiTypes_1 = require("../../../DiTypes");
const messages_1 = require("../../../constants/messages");
let TodoService = class TodoService {
    createNewList(listName, userUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoRepository.createNewList(listName, userUUID);
        });
    }
    getUserTodoList(userId, listId, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoRepository.getUserTodoList(userId, listId, pageNumber, pageSize);
        });
    }
    updateUserTodoList(userId, listId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoRepository.updateTodoList(userId, listId, updates);
        });
    }
    createNewTodoItem(text, listId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoRepository.createNewTodoItem(text, listId, userId);
        });
    }
    getUserTodoItem(userId, listId, todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userList = yield this.todoRepository.getUserTodoList(userId, listId, 1, 1);
            if (userList.length > 0) {
                return yield this.todoRepository.getUserTodoItem(userId, listId, todoId, null, null);
            }
            throw new Error(messages_1.TodoMessage.REQUESTED_LIST_IS_NOT_AVAILABLE);
        });
    }
    updateUserTodoItem(userId, listId, todoId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoRepository.updateUserTodoItem(userId, listId, todoId, updates);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(DiTypes_1.Types.TODO_REPOSITORY),
    __metadata("design:type", Object)
], TodoService.prototype, "todoRepository", void 0);
TodoService = __decorate([
    (0, inversify_1.injectable)()
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=TodoService.js.map