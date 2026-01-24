import { ApiError } from "#utils/error.utils.js";
import { getAllUsersService } from "#services/admin/users.services.js";

const getAllUsersController = async (req, res, next) => {
  const { limit, page } = req.query;
  try {
    const users = await getAllUsersService(limit, page);

    res.status(200).json({ message: "Get all users - to be implemented" });
  } catch (error) {
    next(error);
  }
};

export { getAllUsersController };
