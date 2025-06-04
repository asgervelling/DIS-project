"use strict";
/**
 * Populate the database with the records in data/Cafe_Data_20_rows.csv.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../lib/db");
/**
 * Hello world with the pg library. Get set up, do a single insert
 * and a single select, just to check that it works.
 */
// insert
async function tryInsert() {
    const client = await db_1.pool.connect();
    try {
        const result = await client.query("INSERT INTO categories (name) VALUES ($1)", ["BEVERAGES"]);
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        client.release();
    }
}
tryInsert().then(() => db_1.pool.end());
