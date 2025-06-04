"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Populate the database with the records in data/Cafe_Data_20_rows.csv.
 */
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
const read_dataset_1 = require("../read-dataset");
const parsing_1 = require("../parsing");
dotenv.config();
const client = new pg_1.Client({ connectionString: process.env.DATABASE_URL });
const categoryIds = new Map();
const menuItemIds = new Map();
const transactionIds = new Map();
const lineNumbers = new Map();
async function populateDb(datasetPath) {
    console.log(process.env.DATABASE_URL);
    await client.connect();
    await (0, read_dataset_1.readDataset)(datasetPath, async (r) => {
        try {
            let cid = categoryIds.get(r.category);
            if (!cid) {
                const res = await client.query(`INSERT INTO categories (name) VALUES ($1)
          ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
          RETURNING cid`, [r.category]);
                cid = res.rows[0].cid;
                if (!cid) {
                    console.error("Design error. Record:", r);
                    client.end();
                    process.exit(-1);
                }
                categoryIds.set(r.category, cid);
            }
        }
        catch (error) {
            if (error instanceof parsing_1.ParseError) {
                console.error(error.message);
                client.end();
                process.exit(-1);
            }
            else {
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
