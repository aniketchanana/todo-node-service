import { DataTypes } from "sequelize";
import { sequelize } from "../init";
import { DB_TABLES } from "../../../../constants/dbTables";
import { User } from "./userModel";
import { ITodoItemModel } from "../../../interfaces";
import { TodoList } from "./todoListModel";

export const TodoItem = sequelize.define<ITodoItemModel>(
  DB_TABLES.TODO_LIST,
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    text: {
      type: DataTypes.STRING,
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
  },
  {
    timestamps: true,
  }
);
