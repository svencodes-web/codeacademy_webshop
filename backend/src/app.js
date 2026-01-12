import express from "express";
import cookieParser from "cookie-parser";
// ---------- PUBLIC ROUTES ----------
import userAuthRouter from "#routes/public/auth.routes.js";

// ---------- ADMIN ROUTES ----------
import adminAuthRouter from "#routes/admin/auth.routes.js";

// ---------- MIDDLEWARE IMPORTS ----------
import { errorMiddleware } from "#middlewares/error.middleware.js";

// Api versioning
const PUBLIC_API_V1 = "/api";
const ADMIN_API_V1 = "/api/admin";

const app = express();

// Express middleware
app.use(express.json());
app.use(cookieParser());

// ---------- PUBLIC API MOUNTS ----------
app.use(`${PUBLIC_API_V1}/auth`, userAuthRouter);

// ---------- ADMIN API MOUNTS ----------
app.use(`${ADMIN_API_V1}/auth`, adminAuthRouter);

// ---------- ERROR HANDLING MIDDLEWARE ----------

app.use(errorMiddleware);

export default app;
