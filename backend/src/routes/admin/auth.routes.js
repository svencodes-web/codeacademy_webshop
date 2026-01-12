import { Router } from "express";

const adminAuthRouter = Router();

adminAuthRouter.post("/login", (req, res, next) => {
  res.status(200).json({ message: "Admin login route" });
});

export default adminAuthRouter;
