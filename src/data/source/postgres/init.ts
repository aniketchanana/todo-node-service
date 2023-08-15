import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(process.env.CONNECTION_URI);

(async () => {
  console.log("---Trying to connect with postgres---");
  try {
    await sequelize.authenticate();
    console.log("--DB connection established successfully--");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
})();
