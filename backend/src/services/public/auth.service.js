import bcrypt from "bcryptjs";

import { getUserByEmail, createUser } from "#models/user.model.js";
import { generateUUID } from "#utils/helpers.js";
import { registerUserMap } from "#models/mappings/user.mapping.js";
import { ApiError } from "#utils/error.utils.js";

const registerUserService = async ({ email, password }, dbClient) => {
  // Check if the user already exists
  const userAlreadyExists = await getUserByEmail(email, ["id"], dbClient);

  if (userAlreadyExists) {
    throw new ApiError("User already exists", 409);
  }

  //   create a password hash using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = generateUUID();

  //   Map the userInfo so the user can be created by the user model
  const userMap = registerUserMap(userId, email, hashedPassword);

  // Create the user in the database
  const createdUser = await createUser(userMap, dbClient);

  // Validate that the user was created successfully we check on id so we know it was created
  if (!createdUser.id) {
    throw new ApiError("Registration did not succeed, please try again", 500);
  }

  return createdUser;
};

export { registerUserService };
