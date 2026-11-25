import { AppError } from "../../common/errors/app-error";

export class InvalidCredentialsError extends AppError {
  readonly statusCode = 400;

  constructor() {
    super("Invalid credentials");
  }
}
