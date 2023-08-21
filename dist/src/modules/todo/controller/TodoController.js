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
exports.TodoController = void 0;
const inversify_1 = require("inversify");
const DiTypes_1 = require("../../../DiTypes");
const reqValidations_1 = require("./reqValidations");
const statusCode_1 = require("../../../constants/statusCode");
const messages_1 = require("../../../constants/messages");
const lodash_1 = require("lodash");
const utils_1 = require("../../../utils");
let TodoController = class TodoController {
    createNewList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: newListParameters } = req;
            try {
                yield reqValidations_1.validateCreateNewListRequest.validate(newListParameters);
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.BAD_REQUEST).json({
                    title: e.message,
                    description: messages_1.CommonMessages.INVALID_REQ_BODY,
                });
            }
            try {
                const { listName } = newListParameters;
                const user = req.user;
                const newList = yield this.todoService.createNewList(listName, user.uuid);
                return res.status(statusCode_1.StatusCode.RESOURCE_CREATED).json({
                    title: messages_1.TodoMessage.SUCCESSFULLY_CREATED_LIST,
                    data: {
                        listDetails: newList,
                    },
                });
            }
            catch (e) {
                res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.TodoMessage.UNABLE_TO_CREATE_LIST,
                });
            }
        });
    }
    getUserTodoList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, query } = req;
                let listId = (0, lodash_1.get)(query, "listId", null);
                let pageNumber = (0, lodash_1.get)(query, "pageNumber", null);
                let pageSize = (0, lodash_1.get)(query, "pageSize", null);
                const allTodoList = yield this.todoService.getUserTodoList(user.uuid, listId, pageNumber, pageSize);
                return res.status(statusCode_1.StatusCode.SUCCESS).json({
                    data: {
                        allList: allTodoList,
                    },
                });
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.CommonMessages.UNABLE_TO_FETCH_RESULT,
                });
            }
        });
    }
    updateUserTodoList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reqValidations_1.validateTodoListUpdateRequest.validate((0, lodash_1.get)(req, "body"));
                if (!(0, utils_1.isUpdateAllowed)((0, lodash_1.get)(req, "body.updates"), ["name"])) {
                    throw new Error(messages_1.CommonMessages.INVALID_REQ_BODY);
                }
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.BAD_REQUEST).json({
                    title: e.message,
                    description: messages_1.CommonMessages.INVALID_REQ_BODY,
                });
            }
            try {
                const userId = (0, lodash_1.get)(req, "user.uuid");
                const listId = (0, lodash_1.get)(req, "body.listId");
                const updates = (0, lodash_1.get)(req, "body.updates");
                yield this.todoService.updateUserTodoList(userId, listId, updates);
                res.status(statusCode_1.StatusCode.SUCCESS).json({
                    success: true,
                });
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.CommonMessages.UNABLE_TO_UPDATE_RECORD,
                });
            }
        });
    }
    deleteUserTodoList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reqValidations_1.validateDeleteTodoLisRequest.validate((0, lodash_1.get)(req, "body"));
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.BAD_REQUEST).json({
                    title: e.message,
                    description: messages_1.CommonMessages.INVALID_REQ_BODY,
                });
            }
            try {
                const userId = (0, lodash_1.get)(req, "user.uuid");
                const listId = (0, lodash_1.get)(req, "body.listId");
                yield this.todoService.updateUserTodoList(userId, listId, {
                    isDeleted: true,
                });
                res.status(statusCode_1.StatusCode.SUCCESS).json({
                    success: true,
                });
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.CommonMessages.UNABLE_TO_UPDATE_RECORD,
                });
            }
        });
    }
    createNewTodoItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqBody = (0, lodash_1.get)(req, "body");
            try {
                yield reqValidations_1.validateCreateTodoItemRequest.validate(reqBody);
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.BAD_REQUEST).json({
                    title: e.message,
                    description: messages_1.CommonMessages.INVALID_REQ_BODY,
                });
            }
            try {
                const { text, listId } = reqBody;
                const { uuid: userId } = req.user;
                const newlyAddedTodoItem = yield this.todoService.createNewTodoItem(text, listId, userId);
                res.status(statusCode_1.StatusCode.RESOURCE_CREATED).json({
                    data: newlyAddedTodoItem,
                });
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.CommonMessages.UNABLE_TO_ADD_RECORD,
                });
            }
        });
    }
    getUserTodoItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, query } = req;
                let todoId = (0, lodash_1.get)(query, "todoId", null);
                let listId = (0, lodash_1.get)(query, "listId", null);
                let pageNumber = (0, lodash_1.get)(query, "pageNumber", null);
                let pageSize = (0, lodash_1.get)(query, "pageSize", null);
                if (!listId) {
                    throw new Error(messages_1.TodoMessage.LIST_ID_IS_REQUIRED);
                }
                const allTodoItems = yield this.todoService.getUserTodoItem(user.uuid, listId, todoId, pageNumber, pageSize);
                return res.status(statusCode_1.StatusCode.SUCCESS).json({
                    data: {
                        allTodo: allTodoItems,
                    },
                });
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.CommonMessages.UNABLE_TO_FETCH_RESULT,
                });
            }
        });
    }
    updateUserTodoItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reqValidations_1.validateUpdateTodoItemRequest.validate((0, lodash_1.get)(req, "body"));
                if (!(0, utils_1.isUpdateAllowed)((0, lodash_1.get)(req, "body.updates"), ["text", "isChecked"])) {
                    throw new Error(messages_1.CommonMessages.INVALID_REQ_BODY);
                }
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.BAD_REQUEST).json({
                    title: e.message,
                    description: messages_1.CommonMessages.INVALID_REQ_BODY,
                });
            }
            try {
                const userId = (0, lodash_1.get)(req, "user.uuid");
                const listId = (0, lodash_1.get)(req, "body.listId");
                const todoId = (0, lodash_1.get)(req, "body.todoId");
                const updates = (0, lodash_1.get)(req, "body.updates");
                yield this.todoService.updateUserTodoItem(userId, listId, todoId, updates);
                res.status(statusCode_1.StatusCode.SUCCESS).json({
                    success: true,
                });
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.CommonMessages.UNABLE_TO_UPDATE_RECORD,
                });
            }
        });
    }
    deleteUserTodoItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reqValidations_1.validateDeleteTodoItemRequest.validate((0, lodash_1.get)(req, "body"));
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.BAD_REQUEST).json({
                    title: e.message,
                    description: messages_1.CommonMessages.INVALID_REQ_BODY,
                });
            }
            try {
                const userId = (0, lodash_1.get)(req, "user.uuid");
                const listId = (0, lodash_1.get)(req, "body.listId");
                const todoId = (0, lodash_1.get)(req, "body.todoId");
                yield this.todoService.updateUserTodoItem(userId, listId, todoId, {
                    isDeleted: true,
                });
                res.status(statusCode_1.StatusCode.SUCCESS).json({
                    success: true,
                });
            }
            catch (e) {
                return res.status(statusCode_1.StatusCode.SERVER_ERROR).json({
                    title: e.message,
                    description: messages_1.CommonMessages.UNABLE_TO_UPDATE_RECORD,
                });
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(DiTypes_1.Types.TODO_SERVICE),
    __metadata("design:type", Object)
], TodoController.prototype, "todoService", void 0);
TodoController = __decorate([
    (0, inversify_1.injectable)()
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=TodoController.js.map