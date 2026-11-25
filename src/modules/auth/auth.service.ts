import bcrypt from "bcrypt";
import { UserAlreadyExistsError } from "../users/users.errors";
import { createUserData, findUserDataByEmail } from "../users/users.service";
import { ICreateUserPayload } from "./types";

export const signup = async ({
  firstName,
  lastName,
  email,
  password,
}: ICreateUserPayload) => {
  const existingUser = await findUserDataByEmail(email);

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUserData({
    firstName,
    lastName,
    email,
    passwordHash: hashedPassword,
  });
};
