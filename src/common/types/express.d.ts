import type { Model } from "sequelize";
import { IUserAttributes } from "../models/users";

declare global {
  namespace Express {
    interface Request {
      user?: Model<IUserAttributes>;
    }
  }
}

export {};
