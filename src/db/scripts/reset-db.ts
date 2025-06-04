import * as fs from "fs";
import * as path from "path";

import { pool } from "../../lib/db";

async function resetDB() {
  const query = fs.readFileSync(
    path.join(process.cwd(), "src/db/init/01-schema.sql"),
    "utf-8"
  );

  try {
    await pool.query(query);
    console.log("Reset database. Tables are empty.");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await pool.end();
  }
}

resetDB();
