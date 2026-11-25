import express, { type Express } from "express";
import authRouter from "./src/modules/auth/auth.routes";
import { errorHandler } from "./src/common/middlewares/error-handler";

export const app: Express = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use(errorHandler);
