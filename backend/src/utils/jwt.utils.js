import jwt from "jsonwebtoken";
import { JWT_SECRET_TOKEN } from "#config/env.js";

const generateJWTToken = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, JWT_SECRET_TOKEN, {
    expiresIn: "7d",
  });

  res.cookie("jwt_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export { generateJWTToken };
