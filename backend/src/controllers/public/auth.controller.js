import { registerUserService } from "#services/public/auth.service.js";
import { getClient } from "#db/index.js";
import { ApiError } from "#utils/error.utils.js";

const registerUserController = async (req, res, next) => {
  const { email, password } = req.body;

  //   Declare dbClient here to ensure it's accessible in the catch block
  let dbClient;

  try {
    dbClient = await getClient();

    // Validate the request data
    if (!email || !password) {
      throw new ApiError("Email and password are required", 400);
    }

    await dbClient.query("BEGIN");

    // Call the service responsible for registering the user
    const registeredUser = await registerUserService(
      { email, password },
      dbClient
    );

    await dbClient.query("COMMIT");

    return res.status(201).json({
      message: "User registered succesfully",
      user: {
        id: registeredUser.id,
        email: registeredUser.email,
      },
    });
  } catch (error) {
    if (dbClient) {
      await dbClient.query("ROLLBACK");
    }
    next(error);
  } finally {
    if (dbClient) {
      dbClient.release();
    }
  }
};

export { registerUserController };
