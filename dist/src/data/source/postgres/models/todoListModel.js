"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
const sequelize_1 = require("sequelize");
const init_1 = require("../init");
const dbTables_1 = require("../../../../constants/dbTables");
const userModel_1 = require("./userModel");
exports.TodoList = init_1.sequelize.define(dbTables_1.DB_TABLES.TODO_LIST, {
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
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
//# sourceMappingURL=todoListModel.js.map