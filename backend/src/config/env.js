import { config } from "dotenv";

// Load the right .env file based on the NODE_ENV variable
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV, DATABASE_URL, JWT_SECRET_TOKEN, FRONTEND_URL } =
  process.env;
