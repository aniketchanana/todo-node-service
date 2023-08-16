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
    },
    name: {
      type: DataTypes.STRING,
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

(async () => {
  if (process.env.NODE_ENV === "development") {
    await TodoList.sync({ force: true });
  } else {
    await TodoList.sync();
  }
})();
