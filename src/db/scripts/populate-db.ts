/**
 * Populate the database with the records in data/Cafe_Data_20_rows.csv.
 */
import { readDataset } from "../read-dataset";
import { pool } from "../../lib/db";

async function populateDb(datasetPath: string): Promise<void> {
  readDataset(datasetPath, async (r) => {
    console.log(r.date);
  });
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: node populate-db.js <datasetPath>");
  process.exit(1);
}

populateDb(args[0]);

// insert


async function tryInsert() {
  const client = await pool.connect();

  try {
    await client.query("DELETE FROM categories");
    await client.query(
      "INSERT INTO categories (name) VALUES ($1)",
      ["BEVERAGES"]
    );
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

async function trySelect() {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT * FROM categories"
    );
    console.log(result.rows[0]);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

tryInsert().then(trySelect).then(() => pool.end());