import { Router } from "express";

import { createProductController } from "#controllers/admin/products.controller.js";
import { authenticateAdminMiddleware } from "#middlewares/admin/auth.middleware.js";

const adminProductRouter = Router();

adminProductRouter.post(
  "/",
  authenticateAdminMiddleware,
  createProductController
);

export default adminProductRouter;
