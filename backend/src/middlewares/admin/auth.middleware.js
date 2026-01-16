import { getUserByEmail, getUserById } from "#models/user.model.js";
import { ApiError } from "#utils/error.utils.js";
import { verifyJWTToken } from "#utils/jwt.utils.js";
/**
 *
 * #description this middleware grabs a user from the database by email checks if the user exists and is a admin
 * and attaches it to the request object for further processing in the login controller
 */
const loginAdminMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const jwtToken = req.cookies?.jwt_token;

  try {
    if (!email || !password) {
      throw new ApiError("Email and password are required", 400);
    }

    if (jwtToken) {
      throw new ApiError("You are already logged in", 400);
    }

    // Get the user from the database by email
    const user = await getUserByEmail(email, [
      "id",
      "email",
      "password_hash",
      "role",
    ]);

    if (!user) {
      throw new ApiError("User with this email does not exist", 404);
    }

    if (user.role !== "admin") {
      throw new ApiError("Unauthorized access", 401);
    }

    req.loginCandidate = {
      userId: user.id,
      email: user.email,
      hashedPassword: user.password_hash,
      plainPassword: password,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const authenticateAdminMiddleware = async (req, res, next) => {
  const jwt = req.cookies?.jwt_token || null;

  try {
    if (!jwt) {
      throw new ApiError("Unauthorized access", 401);
    }

    const token = verifyJWTToken(jwt);

    const adminUser = await getUserById(token.userId, ["id", "role"]);

    if (!adminUser) {
      throw new ApiError("Unauthorized acces", 401);
    }

    if (adminUser.role !== "admin") {
      throw new ApiError("Unauthorized access", 403);
    }

    req.user = {
      id: adminUser.id,
      role: adminUser.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export { loginAdminMiddleware, authenticateAdminMiddleware };
