import { DataTypes } from "sequelize";
import { sequelize } from "../services/sequelize";

export interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  passwordHash: string;
}

export const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal("uuidv7()"),
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: DataTypes.TEXT,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME,
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    underscored: true,
    timestamps: true,
  },
);
