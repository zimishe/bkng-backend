import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import authRouter from "./src/modules/auth/auth.routes";
import { errorHandler } from "./src/common/middlewares/error-handler";
import authMiddleware from "./src/common/middlewares/auth-middleware";

export const app: Express = express();

const corsOptions = {
  origin: process.env.FRONTEND_DEV_URL || "http://localhost:4000",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Public routes
app.use("/auth", authRouter);

// End of public routes

app.use(authMiddleware);
// Protected routes (require authentication)

// End of protected routes

app.use(errorHandler);
