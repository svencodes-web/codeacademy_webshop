import { registerUserService } from "#services/public/auth.service.js";
import { loginService } from "#services/auth.shared.service..js";
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

const loginUserController = async (req, res, next) => {
  // The loginPublicMiddleware has already validated that the user exists and is a customer
  const { userId, email, plainPassword, hashedPassword, role } =
    req.loginCandidate;

  try {
    const loginData = await loginService(
      { userId, plainPassword, hashedPassword, role },
      res
    );

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: userId,
        email,
        jwt_token: loginData.jwtToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { registerUserController, loginUserController };
