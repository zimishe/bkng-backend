import jwt from "jsonwebtoken";

const DEFAULT_JWT_SECRET = "18582e0a-edb5-4da6-9512-fdfb02c4d593";
const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
const JWT_EXPIRY = "1h";

export const generateJWT = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

  return token;
};
