class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";

    if (Error.captureStackTrace) {
      // Maintains proper stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
