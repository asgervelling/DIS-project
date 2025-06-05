import { Pool } from "pg";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

/**
 * Connection pool for Postgres.
 * Do not shut it down.
 */
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
