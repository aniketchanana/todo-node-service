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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.PostgresDataSource = void 0;
const inversify_1 = require("inversify");
const dbTables_1 = require("../../../constants/dbTables");
const userModel_1 = require("./models/userModel");
const todoListModel_1 = require("./models/todoListModel");
const lodash_1 = require("lodash");
const todoItemModel_1 = require("./models/todoItemModel");
const ALL_TABLES = {
    [dbTables_1.DB_TABLES.USER]: userModel_1.User,
    [dbTables_1.DB_TABLES.TODO_LIST]: todoListModel_1.TodoList,
    [dbTables_1.DB_TABLES.TODO_ITEM]: todoItemModel_1.TodoItem,
};
let PostgresDataSource = class PostgresDataSource {
    constructor(tableName) {
        this.table = ALL_TABLES[tableName];
    }
    create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = this.table.build(data, options);
            yield instance.save();
            return instance;
        });
    }
    findOne(filter, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: filter,
            };
            if (!(0, lodash_1.isEmpty)(project)) {
                (0, lodash_1.set)(query, "attributes", project);
            }
            const record = yield this.table.findOne(query);
            return record.dataValues;
        });
    }
    findMany({ filter, project, pagination, orderByQuery, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: filter,
            };
            if (!(0, lodash_1.isEmpty)(project)) {
                (0, lodash_1.set)(query, "attributes", project);
            }
            if (!(0, lodash_1.isEmpty)(pagination)) {
                const { pageNumber, pageSize } = pagination;
                const offset = (pageNumber - 1) * pageSize;
                (0, lodash_1.set)(query, "offset", offset);
                (0, lodash_1.set)(query, "limit", pageSize);
            }
            if (!(0, lodash_1.isEmpty)(orderByQuery)) {
                (0, lodash_1.set)(query, "order", orderByQuery);
            }
            const records = yield this.table.findAll(Object.assign({}, query));
            return records;
        });
    }
    findOneAndUpdate(filter, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.table.findOne({
                where: filter,
            });
            if (record) {
                const updatedRecord = yield record.update(updates, {
                    where: filter,
                });
                return updatedRecord.dataValues;
            }
            throw new Error("Record not found");
        });
    }
    findOneAndDelete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {
                isDeleted: true,
            };
            const updatedRecord = this.findOneAndUpdate(filter, updates);
            if (updatedRecord) {
                return true;
            }
            return false;
        });
    }
};
PostgresDataSource = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.unmanaged)()),
    __metadata("design:paramtypes", [String])
], PostgresDataSource);
exports.PostgresDataSource = PostgresDataSource;
//# sourceMappingURL=index.js.map