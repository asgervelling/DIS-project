/**
 * Populate the database with the records in <datasetPath>.
 * 
 * Usage: node populate-db.js <datasetPath>
 */
import { Client } from "pg";
import * as dotenv from "dotenv";

import { readDataset } from "../read-dataset";
import { PosRecord } from "../pos-record";
import { ParseError } from "../parsing";

dotenv.config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

type ID = string;
type BillNo = string;
const categoryIds = new Map<string, ID>();
const menuItemIds = new Map<string, `${string}|${string}`>();
const transactionIds = new Map<BillNo, ID>();
const lineNumbers = new Map<BillNo, number>();

async function populateDb(datasetPath: string): Promise<void> {
  await client.connect();

  let i = 0;

  await readDataset(datasetPath, async (r: PosRecord) => {
    try {
      // Create category
      let cid = categoryIds.get(r.category);
      if (!cid) {
        const res = await client.query(
          `INSERT INTO categories (name) VALUES ($1)
          ON CONFLICT (name)
          DO UPDATE SET name = EXCLUDED.name RETURNING cid`,
          [r.category]
        );
        cid = res.rows[0].cid;
        if (!cid) {
          console.error("No cid for record", r);
          client.end();
          process.exit(-1);
        }
        categoryIds.set(r.category, cid);
      }

      // Create menu item
      let compositeKey = `${r.itemDesc}|${r.category}`;
      let iid = menuItemIds.get(compositeKey);
      if (!iid) {
        // We will have to set the cost manually later
        const res = await client.query(
          `INSERT INTO menu_items
          (name, price, cost, tax_rate, discount_rate, cid)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (name, cid)
          DO NOTHING RETURNING iid`,
          [r.itemDesc, r.rate, 0, r.tax / r.rate, r.discount / r.rate, cid]
        );
        iid = res.rows[0].iid;
        if (!iid) {
          console.error("No iid for record", r);
          client.end();
          process.exit(-1);
        }
        menuItemIds.set(compositeKey, iid);
      }

      // Create transaction
      let tid = transactionIds.get(r.billNo);
      if (!tid) {
        const res = await client.query(
          `INSERT INTO transactions (date, bill_no) VALUES ($1, $2)
          ON CONFLICT (bill_no) DO NOTHING RETURNING tid`,
          [r.date, r.billNo]
        );
        tid = res.rows[0].tid;
        if (!tid) {
          console.error("No tid for record", r);
          client.end();
          process.exit(-1);
        }
        transactionIds.set(r.billNo, tid);
      }

      // Create transaction item
      const lineNo = (lineNumbers.get(r.billNo) || 0) + 1;
      lineNumbers.set(r.billNo, lineNo);
      await client.query(
        `INSERT INTO transaction_items
        (tid, line_no, iid, quantity, rate, tax, discount, total)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (tid, line_no) DO NOTHING`,
        [tid, lineNo, iid, r.quantity, r.rate, r.tax, r.discount, r.total]
      )

    } catch (error) {
      if (error instanceof ParseError) {
        console.error(error.message);
        client.end();
        process.exit(-1);
      } else {
        console.error(error);
        client.end();
        process.exit(-1);
      }
    }

    i++;
  });

  console.log(`Populated database with ${i} records.`);
  await client.end();
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: node populate-db.js <datasetPath>");
  process.exit(1);
}

populateDb(args[0]);
