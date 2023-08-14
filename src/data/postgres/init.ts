import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  `postgres://aniket:${process.env.DB_PASS}@example.com:5432/${process.env.DB_NAME}`
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established successfully");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
})();
