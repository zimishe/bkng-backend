import { Model } from "sequelize";
import { IUserAttributes, UserModel } from "./users.model";

export const findUserDataByEmail = async (
  email: string,
): Promise<Model<IUserAttributes> | null> => {
  const existingUser = await UserModel.findOne({
    where: { email },
  });

  return existingUser;
};

export const createUserData = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}) => {
  const newUser = await UserModel.create(data);

  return newUser;
};
