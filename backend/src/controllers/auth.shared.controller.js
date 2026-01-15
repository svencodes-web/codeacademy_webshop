import { loginService } from "#services/auth.shared.service..js";

const loginController = async (req, res, next) => {
  // The login Middleware has already validated that the user exists
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

const logoutController = (req, res, next) => {
  res.clearCookie("jwt_token");
  return res.status(200).json({ message: "User logged out successfully" });
};

export { loginController, logoutController };
