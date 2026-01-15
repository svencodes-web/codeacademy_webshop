import { Router } from "express";

import { loginAdminMiddleware } from "#middlewares/admin/auth.middleware.js";
import {
  loginController,
  logoutController,
} from "#controllers/auth.shared.controller.js";

const adminAuthRouter = Router();

adminAuthRouter.post("/login", loginAdminMiddleware, loginController);
adminAuthRouter.post("/logout", logoutController);
export default adminAuthRouter;
