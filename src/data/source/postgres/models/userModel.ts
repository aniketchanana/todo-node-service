import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../init";
import { IUserModel } from "../../../interfaces";

export const User = sequelize.define<IUserModel>(
  "User",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

(async () => {
  await User.sync();
})();
