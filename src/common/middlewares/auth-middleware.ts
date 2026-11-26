import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { findUserDataById } from "../services/users";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    const JWT_SECRET = process.env.JWT_SECRET || "";

    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded) ||
      typeof decoded.userId !== "string"
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await findUserDataById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.error("Authentication error:", error);

    res.status(500).json({ message: "Server error during authentication" });
  }
};

export default authMiddleware;
