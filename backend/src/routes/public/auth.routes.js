import { Router } from "express";

import {
  registerUserController,
  loginUserController,
} from "#controllers/public/auth.controller.js";
import { loginPublicMiddleware } from "#middlewares/public/auth.middleware.js";
const userAuthRouter = Router();

userAuthRouter.post("/register", registerUserController);
userAuthRouter.post("/login", loginPublicMiddleware, loginUserController);

export default userAuthRouter;
