import type { Request, Response } from "express";
import * as authService from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;

  await authService.signup({ firstName, lastName, email, password });

  res.status(201).json({ message: "User registered successfully!" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await authService.login({ email, password });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
    path: "/",
  });

  res.status(200).json({ message: "User logged in successfully!" });
};
