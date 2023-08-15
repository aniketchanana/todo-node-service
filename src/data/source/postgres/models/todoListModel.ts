import { DataTypes } from "sequelize";
import { ITodoListModel } from "../../../interfaces";
import { sequelize } from "../init";

export const TodoList = sequelize.define<ITodoListModel>(
  "TodoList",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isDeleted: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
  }
);
