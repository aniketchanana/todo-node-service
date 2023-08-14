import { Sequelize } from "sequelize";
const CONNECTION_URI = `postgres://aniket:${process.env.DB_PASS}@example.com:5432/${process.env.DB_NAME}`;

export const sequelize = new Sequelize(CONNECTION_URI);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established successfully");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
})();
