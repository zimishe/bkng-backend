import jwt from "jsonwebtoken";

const JWT_SECRET = "not very secret";
const JWT_EXPIRY = "1h";

export const generateJWT = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

  return token;
};
