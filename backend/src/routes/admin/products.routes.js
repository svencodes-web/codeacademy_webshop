import { Router } from "express";

import {
  getAllProductsController,
  createProductController,
  updateProductController,
  deleteproductController,
} from "#controllers/admin/products.controller.js";
import { authenticateAdminMiddleware } from "#middlewares/admin/auth.middleware.js";

const adminProductRouter = Router();

adminProductRouter.get(
  "/",
  authenticateAdminMiddleware,
  getAllProductsController
);

adminProductRouter.post(
  "/",
  authenticateAdminMiddleware,
  createProductController
);

adminProductRouter.put(
  "/:id",
  authenticateAdminMiddleware,
  updateProductController
);

adminProductRouter.delete(
  "/:id",
  authenticateAdminMiddleware,
  deleteproductController
);

export default adminProductRouter;
