import "dotenv/config";
import { Server } from "http";
import { app } from "./app";
import { sequelize } from "./src/services/sequelize";

const port = process.env.PORT || 3000;
let server: Server;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    server = app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

process.on("SIGTERM", () => {
  server.close(async () => {
    sequelize.close();
    process.exit(0);
  });
});
