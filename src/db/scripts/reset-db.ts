/**
 * This script runs the query at db/init/01-schema.sql.
 * It (re)creates the tables.
 */
import * as fs from "fs";
import * as path from "path";
import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

async function resetDB() {
  const schemaPath = path.join(process.cwd(), "db/init/01-schema.sql");

  try {
    const query = fs.readFileSync(schemaPath, "utf-8");
    
    await client.connect();
    await client.query(query);
    console.log("Reset database. Tables are empty.");

  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    client.end();
  }
}

resetDB();
