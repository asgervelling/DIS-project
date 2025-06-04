/**
 * Populate the database with the records in data/Cafe_Data_20_rows.csv.
 */
import { Client } from "pg";
import * as dotenv from "dotenv";

import { readDataset } from "../read-dataset";
import { PosRecord } from "../pos-record";
import { ParseError } from "../parsing";

dotenv.config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

type ID = string;
const categoryIds = new Map<string, ID>();
const menuItemIds = new Map<string, ID>();
const transactionIds = new Map<string, ID>();
const lineNumbers = new Map<string, number>();

async function populateDb(datasetPath: string): Promise<void> {
  console.log(process.env.DATABASE_URL);
  await client.connect();

  await readDataset(datasetPath, async (r: PosRecord) => {
    try {
      let cid = categoryIds.get(r.category);
      if (!cid) {
        const res = await client.query(
          `INSERT INTO categories (name) VALUES ($1)
          ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
          RETURNING cid`,
          [r.category]
        )
        cid = res.rows[0].cid;
        if (!cid) {
          console.error("Design error. Record:", r);
          client.end();
          process.exit(-1);
        }
        categoryIds.set(r.category, cid);
      }
    } catch (error) {
      if (error instanceof ParseError) {
        console.error(error.message);
        client.end();
        process.exit(-1);
      } else {
        console.error(error);
        process.exit(-1);
      }
    }
  });

  console.log(categoryIds);
  console.log("hi");

  await client.end();
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: node populate-db.js <datasetPath>");
  process.exit(1);
}

populateDb(args[0]);
