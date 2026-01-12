import bcrypt from "bcryptjs";

import { generateJWTToken } from "#utils/jwt.utils.js";
import { ApiError } from "#utils/error.utils.js";

/**
 *
 * @description This service handles login for admin and customers
 */
const loginService = async (
  { userId, plainPassword, hashedPassword, role },
  res
) => {
  // Compare the provided password with the stored password hash
  const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isPasswordValid) {
    throw new ApiError("Invalid password", 401);
  }

  // Generate JWT token and set it in HTTP-only cookie
  const token = generateJWTToken(userId, role, res);

  return { jwtToken: token };
};

export { loginService };
