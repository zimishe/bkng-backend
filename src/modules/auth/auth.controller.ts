import type { Request, Response } from "express";
import * as authService from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;

  await authService.signup({ firstName, lastName, email, password });

  res.status(201).json({ message: "User registered successfully!" });
};
