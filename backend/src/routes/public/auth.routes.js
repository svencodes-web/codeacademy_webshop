import { Router } from "express";

import { registerUserController } from "#controllers/public/auth.controller.js";
import {
  loginController,
  logoutController,
} from "#controllers/auth.shared.controller.js";
import { loginPublicMiddleware } from "#middlewares/public/auth.middleware.js";
const userAuthRouter = Router();

userAuthRouter.post("/register", registerUserController);
userAuthRouter.post("/login", loginPublicMiddleware, loginController);
userAuthRouter.post("/logout", logoutController);

export default userAuthRouter;
