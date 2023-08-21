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
exports.TodoRepository = void 0;
const inversify_1 = require("inversify");
const DiTypes_1 = require("../../../DiTypes");
// ToDo: fix any typeCasting here
let TodoRepository = class TodoRepository {
    createNewList(listName, userUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoListTable.create({
                name: listName,
                userId: userUUID,
            });
        });
    }
    getUserTodoList(userId, listId, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                userId,
                isDeleted: false,
            };
            if (listId) {
                query.uuid = listId;
            }
            let pagination = {};
            if (pageNumber && pageSize) {
                pagination = {
                    pageNumber,
                    pageSize,
                };
            }
            return this.todoListTable.findMany({
                filter: query,
                pagination,
                orderByQuery: [["createdAt", "DESC"]],
            });
        });
    }
    updateTodoList(userId, listId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoListTable.findOneAndUpdate({
                userId,
                uuid: listId,
            }, Object.assign({}, updates));
        });
    }
    createNewTodoItem(text, listId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoItemTable.create({
                text,
                userId,
                todoListId: listId,
            });
        });
    }
    getUserTodoItem(userId, listId, todoId, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                userId,
                isDeleted: false,
                todoListId: listId,
            };
            if (todoId) {
                query.uuid = todoId;
            }
            return this.todoItemTable.findMany({
                filter: query,
                orderByQuery: [["createdAt", "ASC"]],
            });
        });
    }
    updateUserTodoItem(userId, listId, todoId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoItemTable.findOneAndUpdate({
                userId,
                uuid: todoId,
                todoListId: listId,
            }, Object.assign({}, updates));
        });
    }
};
__decorate([
    (0, inversify_1.inject)(DiTypes_1.Types.TODO_ITEM_TABLE),
    __metadata("design:type", Object)
], TodoRepository.prototype, "todoItemTable", void 0);
__decorate([
    (0, inversify_1.inject)(DiTypes_1.Types.TODO_LIST_TABLE),
    __metadata("design:type", Object)
], TodoRepository.prototype, "todoListTable", void 0);
TodoRepository = __decorate([
    (0, inversify_1.injectable)()
], TodoRepository);
exports.TodoRepository = TodoRepository;
//# sourceMappingURL=TodoRepository.js.map