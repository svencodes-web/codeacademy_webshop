import { Router } from "express";

import {
  loginAdminMiddleware,
  authenticateAdminMiddleware,
} from "#middlewares/admin/auth.middleware.js";
import {
  loginController,
  logoutController,
} from "#controllers/auth.shared.controller.js";

const adminAuthRouter = Router();

// Auth routes
adminAuthRouter.post("/login", loginAdminMiddleware, loginController);
adminAuthRouter.post("/logout", logoutController);

export default adminAuthRouter;
