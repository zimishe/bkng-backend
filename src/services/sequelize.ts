import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("bkng", "postgres", "1212", {
  host: "localhost",
  dialect: "postgres",
});
