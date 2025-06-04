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
const fs = __importStar(require("node:fs"));
const readline = __importStar(require("node:readline"));
const parse = __importStar(require("../parsing"));
const transform_dataset_1 = require("../transform-dataset");
/*
This script should be run prior to seeding the database.

Our dataset is from around 2010. In order to make it a little
easier to work with, we have this script, which will take
as input a CSV file used to seed the database, and output another
CSV file where the dates are more current.
The last day in the dataset will be used to measure a time delta
to add to each day in that dataset.
The resulting dataset will be written to a new location.

This will be beneficial for seeing INSERT statements reflected in the dashboard.
*/
const NOW = new Date();
async function makeCurrent() {
    const latestDate = await getLatestDate(INPUT_DATASET);
    const offsetDays = dayOffset(latestDate, NOW);
    await (0, transform_dataset_1.transformDataset)(INPUT_DATASET, OUTPUT_DATASET, (r) => {
        const { date, ...rest } = r;
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + offsetDays);
        return { date: newDate, ...rest };
    });
}
async function getLatestDate(datasetPath) {
    const input = fs.createReadStream(datasetPath);
    const rl = readline.createInterface({ input, crlfDelay: Infinity });
    let latest = new Date(0);
    let i = 0;
    for await (const line of rl) {
        if (i++ === 0)
            continue;
        const parseResult = parse.posRecord.run(line);
        if (parseResult.isError) {
            throw new parse.ParseError(parseResult.error, i);
        }
        const date = parseResult.result.date;
        if (date > latest) {
            latest = date;
        }
    }
    return latest;
}
/**
 * Find the date offset to add to a date to make it more current.
 */
function dayOffset(td_latest, tc) {
    const latest = new Date(td_latest.getFullYear(), td_latest.getMonth(), td_latest.getDate());
    const current = new Date(tc.getFullYear(), tc.getMonth(), tc.getDate());
    const msPerDay = 86400000;
    return Math.round((current.getTime() - latest.getTime()) / msPerDay);
}
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error("Usage: node make-current.js <inputPath> <outputPath>");
    process.exit(-1);
}
const [INPUT_DATASET, OUTPUT_DATASET] = args;
makeCurrent();
