import { DataTypes } from "sequelize";
import { sequelize } from "../init";
import { DB_TABLES } from "../../../../constants/dbTables";
import { User } from "./userModel";
import { ITodoItemModel } from "../../../interfaces";
import { TodoList } from "./todoListModel";

export const TodoItem = sequelize.define<ITodoItemModel>(
  DB_TABLES.TODO_ITEM,
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    todoListId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: TodoList,
        key: "uuid",
      },
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
