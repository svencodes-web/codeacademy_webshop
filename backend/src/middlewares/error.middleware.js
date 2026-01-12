import { NODE_ENV } from "#config/env.js";

const errorMiddleware = (err, req, res, next) => {
  console.error("A ERROR OCCURRED:", err);

  if (res.headersSent) return next(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      ...(NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

export { errorMiddleware };
