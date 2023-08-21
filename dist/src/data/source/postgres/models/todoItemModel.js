"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItem = void 0;
const sequelize_1 = require("sequelize");
const init_1 = require("../init");
const dbTables_1 = require("../../../../constants/dbTables");
const userModel_1 = require("./userModel");
const todoListModel_1 = require("./todoListModel");
exports.TodoItem = init_1.sequelize.define(dbTables_1.DB_TABLES.TODO_ITEM, {
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
    },
    text: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: "",
    },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isChecked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    todoListId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: todoListModel_1.TodoList,
            key: "uuid",
        },
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: userModel_1.User,
            key: "uuid",
        },
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=todoItemModel.js.map