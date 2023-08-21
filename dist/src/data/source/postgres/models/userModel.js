"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const init_1 = require("../init");
const dbTables_1 = require("../../../../constants/dbTables");
exports.User = init_1.sequelize.define(dbTables_1.DB_TABLES.USER, {
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
    emailId: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=userModel.js.map