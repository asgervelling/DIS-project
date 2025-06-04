import { Pool } from "pg";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
