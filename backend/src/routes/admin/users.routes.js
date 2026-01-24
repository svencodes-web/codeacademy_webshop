import { Router } from "express";

import { getAllUsersController } from "#controllers/admin/users.controller.js";
import { authenticateAdminMiddleware } from "#middlewares/admin/auth.middleware.js";

const adminUserRouter = Router();
// TODO: Implement controllers for the routes
adminUserRouter.get("/", authenticateAdminMiddleware, getAllUsersController);

adminUserRouter.put("/:id", authenticateAdminMiddleware);

adminUserRouter.delete("/:id", authenticateAdminMiddleware);

export default adminUserRouter;
