import bcrypt from "bcrypt";
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../users/users.errors";
import { ICreateUserPayload, ILoginPayload } from "./types";
import { InvalidCredentialsError } from "./auth.errors";
import { generateJWT } from "../../common/utils/auth";
import {
  createUserData,
  findUserDataByEmail,
} from "../../common/services/users";

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

export const login = async ({ email, password }: ILoginPayload) => {
  if (!email || !password) {
    throw new InvalidCredentialsError();
  }

  const existingUser = await findUserDataByEmail(email);

  if (!existingUser) {
    throw new UserNotFoundError();
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.getDataValue("passwordHash"),
  );

  if (!isPasswordValid) {
    throw new InvalidCredentialsError();
  }

  const token = generateJWT(existingUser.getDataValue("id"));

  return token;
};
