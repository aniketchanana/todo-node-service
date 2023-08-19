import { DataTypes } from "sequelize";
import { ITodoListModel } from "../../../interfaces";
import { sequelize } from "../init";
import { DB_TABLES } from "../../../../constants/dbTables";
import { User } from "./userModel";

export const TodoList = sequelize.define<ITodoListModel>(
  DB_TABLES.TODO_LIST,
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "uuid",
      },
    },
  },
  {
    timestamps: true,
  }
);
