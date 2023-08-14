import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../init";
import { IUserModel } from "../../interfaces";

export const User = sequelize.define<IUserModel>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
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
