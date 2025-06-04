"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Populate the database with the records in data/Cafe_Data_20_rows.csv.
 */
const read_dataset_1 = require("../read-dataset");
const db_1 = require("../../lib/db");
async function populateDb(datasetPath) {
    (0, read_dataset_1.readDataset)(datasetPath, async (r) => {
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
    const client = await db_1.pool.connect();
    try {
        await client.query("DELETE FROM categories");
        await client.query("INSERT INTO categories (name) VALUES ($1)", ["BEVERAGES"]);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        client.release();
    }
}
async function trySelect() {
    const client = await db_1.pool.connect();
    try {
        const result = await client.query("SELECT * FROM categories");
        console.log(result.rows[0]);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        client.release();
    }
}
tryInsert().then(trySelect).then(() => db_1.pool.end());
