import { DataTypes } from "sequelize";
import { sequelize } from "../init";
import { IUserModel } from "../../../interfaces";
import { DB_TABLES } from "../../../../constants/dbTables";

export const User = sequelize.define<IUserModel>(
  DB_TABLES.USER,
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
