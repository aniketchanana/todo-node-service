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
Object.defineProperty(exports, "__esModule", { value: true });
const todoItemModel_1 = require("./todoItemModel");
const todoListModel_1 = require("./todoListModel");
const userModel_1 = require("./userModel");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.User.sync();
    yield todoListModel_1.TodoList.sync();
    yield todoItemModel_1.TodoItem.sync();
}))();
//# sourceMappingURL=initTable.js.map