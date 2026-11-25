import { AppError } from "../../common/errors/app-error";

export class UserAlreadyExistsError extends AppError {
  readonly statusCode = 409;

  constructor() {
    super("User already exists");
  }
}

export class UserNotFoundError extends AppError {
  readonly statusCode = 404;

  constructor() {
    super("User not found");
  }
}
